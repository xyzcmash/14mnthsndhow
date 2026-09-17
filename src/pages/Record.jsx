import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import NavBar from '../components/NavBar';
import FloatingHearts from '../components/FloatingHearts';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';
import { uploadAudio } from '../utils/cloudinary';
import { sendToWhatsApp } from '../utils/waLink';
import { HER_NAME } from '../utils/relationship';

export default function Record() {
  const { user } = useAuth();
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      setError("couldn't get mic access — check your browser permissions and try again");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    clearInterval(timerRef.current);
    setRecording(false);
  };

  const discard = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setSeconds(0);
  };

  const handleSend = async () => {
    if (!audioBlob && !text.trim()) return;
    setStatus('sending');
    setError('');

    try {
      let downloadUrl = null;

      if (audioBlob) {
        downloadUrl = await uploadAudio(audioBlob);
      }

      await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        name: user.displayName || HER_NAME,
        text: text.trim() || null,
        audioUrl: downloadUrl,
        createdAt: serverTimestamp(),
      });

      const waText = buildWaText({ name: user.displayName, text, downloadUrl });
      sendToWhatsApp({ text: waText });

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#e11d48', '#ffffff', '#fbbf24'],
      });

      setStatus('sent');
      setTimeout(() => {
        setAudioBlob(null);
        setAudioUrl(null);
        setSeconds(0);
        setText('');
        setStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('sending failed — check your connection and try again');
      setStatus('idle');
    }
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="relative min-h-screen bg-black text-white">
      <FloatingHearts count={10} />
      <NavBar />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 py-16 text-center">
        <p className="font-quicksand text-sm uppercase tracking-[0.35em] text-rose-400/80">
          straight to his whatsapp
        </p>
        <h1 className="mt-3 font-dancing text-4xl sm:text-5xl">say anything, ashu</h1>
        <p className="mt-3 max-w-sm font-quicksand text-sm text-neutral-500">
          record a voice note or just type something. one tap and it's on its way to me.
        </p>

        <div className="mt-12 flex flex-col items-center">
          <motion.button
            onClick={recording ? stopRecording : startRecording}
            whileTap={{ scale: 0.92 }}
            className={`relative flex h-32 w-32 items-center justify-center rounded-full text-4xl shadow-[0_0_40px_rgba(225,29,72,0.4)] transition ${
              recording ? 'bg-rose-600' : 'bg-neutral-900 border border-rose-500/40'
            }`}
          >
            {recording && (
              <motion.span
                className="absolute inset-0 rounded-full bg-rose-600/40"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            {recording ? '⏹️' : '🎙️'}
          </motion.button>

          <p className="mt-4 font-quicksand text-2xl tabular-nums text-rose-400">
            {mm}:{ss}
          </p>

          {audioUrl && !recording && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-col items-center gap-3"
            >
              <audio src={audioUrl} controls className="h-10" />
              <button
                onClick={discard}
                className="font-quicksand text-xs text-neutral-500 underline-offset-4 hover:text-rose-400 hover:underline"
              >
                scrap it, record again
              </button>
            </motion.div>
          )}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="...or type something instead / as well"
          rows={3}
          className="mt-10 w-full resize-none rounded-2xl border border-white/10 bg-neutral-950/70 p-4 font-quicksand text-white placeholder-neutral-600 outline-none focus:border-rose-500"
        />

        {error && <p className="mt-3 font-quicksand text-sm text-rose-400">{error}</p>}

        <AnimatePresence mode="wait">
          {status === 'sent' ? (
            <motion.p
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 font-quicksand text-rose-400"
            >
              sent 🖤 just tap the send arrow in whatsapp to finish it off
            </motion.p>
          ) : (
            <motion.button
              key="send"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSend}
              disabled={status === 'sending' || (!audioBlob && !text.trim())}
              className="mt-6 w-full rounded-full bg-rose-600 py-4 font-quicksand text-lg font-semibold text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === 'sending' ? 'sending...' : 'send to him 🖤'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function buildWaText({ name, text, downloadUrl }) {
  const who = name || HER_NAME;
  let msg = `🖤 a message from ${who}\n\n`;
  if (text?.trim()) msg += `"${text.trim()}"\n\n`;
  if (downloadUrl) msg += `voice note: ${downloadUrl}\n\n`;
  msg += `sent from our little corner of the internet`;
  return msg;
}
