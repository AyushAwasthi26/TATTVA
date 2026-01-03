// import { useState, useRef, useEffect } from "react";
// import { Camera, ImageUp, ArrowRight, X, FileText, Mic, Check, Video, VideoOff, Square, RotateCw } from "lucide-react";

// export default function Input({ onAnalyze }) {
//   const [text, setText] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [pasteSuccess, setPasteSuccess] = useState(false);
//   const [micPermission, setMicPermission] = useState('prompt');
//   const [cameraPermission, setCameraPermission] = useState('prompt');
//   const [transcript, setTranscript] = useState('');
//   const [interimText, setInterimText] = useState('');
//   const [facingMode, setFacingMode] = useState('environment'); // Start with back camera by default
//   const [isMobile, setIsMobile] = useState(false);
  
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const recognitionRef = useRef(null);

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       // Cleanup streams and recognition
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Check permissions on mount
//   useEffect(() => {
//     checkPermissions();
//   }, []);

//   const checkPermissions = async () => {
//     try {
//       // Check microphone permission
//       const micResult = await navigator.permissions.query({ name: 'microphone' });
//       setMicPermission(micResult.state);
//       micResult.addEventListener('change', () => setMicPermission(micResult.state));

//       // Check camera permission
//       const cameraResult = await navigator.permissions.query({ name: 'camera' });
//       setCameraPermission(cameraResult.state);
//       cameraResult.addEventListener('change', () => setCameraPermission(cameraResult.state));
//     } catch (err) {
//       console.log('Permission API not supported');
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim() || uploadedImage) {
//       if (uploadedImage) {
//         onAnalyze(uploadedImage, 'image');
//       } else {
//         onAnalyze(text, 'text');
//       }
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result.split(',')[1]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result.split(',')[1]);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setUploadedImage(null);
//   };

//   const handlePaste = async () => {
//     try {
//       const clipboardText = await navigator.clipboard.readText();
//       if (clipboardText.trim()) {
//         setText(clipboardText);
//         setPasteSuccess(true);
//         setTimeout(() => setPasteSuccess(false), 2000);
//       }
//     } catch (err) {
//       console.error('Failed to read clipboard contents: ', err);
//       // Fallback for older browsers
//       const textArea = document.createElement('textarea');
//       textArea.value = '';
//       document.body.appendChild(textArea);
//       textArea.focus();
//       textArea.select();
      
//       try {
//         const successful = document.execCommand('paste');
//         if (successful && textArea.value.trim()) {
//           setText(textArea.value);
//           setPasteSuccess(true);
//           setTimeout(() => setPasteSuccess(false), 2000);
//         }
//       } catch (err) {
//         console.error('Fallback: Oops, unable to paste', err);
//       }
      
//       document.body.removeChild(textArea);
//     }
//   };

//   // Enhanced Microphone functionality with real-time transcription
//   const startVoiceInput = async () => {
//     try {
//       // Request microphone permission
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       setMicPermission('granted');
      
//       // Check if browser supports speech recognition
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
//       if (!SpeechRecognition) {
//         alert('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
//         return;
//       }

//       const recognition = new SpeechRecognition();
//       recognitionRef.current = recognition;
      
//       recognition.continuous = true;
//       recognition.interimResults = true;
//       recognition.lang = 'en-US';

//       recognition.onstart = () => {
//         setIsListening(true);
//         setTranscript('');
//         setInterimText('');
//       };

//       recognition.onresult = (event) => {
//         let finalTranscript = '';
//         let interimTranscript = '';

//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript;
//           if (event.results[i].isFinal) {
//             finalTranscript += transcript + ' ';
//           } else {
//             interimTranscript += transcript;
//           }
//         }

//         // Update the transcript state
//         setTranscript(prev => prev + finalTranscript);
//         setInterimText(interimTranscript);
        
//         // Update the text field with both final and interim results
//         setText(prev => {
//           // Get the current text without any interim text
//           const baseText = prev.replace(interimText, '');
//           return baseText + finalTranscript + interimTranscript;
//         });
//       };

//       recognition.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setIsListening(false);
//         if (event.error === 'not-allowed') {
//           setMicPermission('denied');
//           alert('Microphone access denied. Please allow microphone access in your browser settings.');
//         }
//       };

//       recognition.onend = () => {
//         setIsListening(false);
//         setInterimText('');
//         stream.getTracks().forEach(track => track.stop());
//       };

//       recognition.start();
//       setIsRecording(true);

//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//       setMicPermission('denied');
//       alert('Failed to access microphone. Please check your browser permissions.');
//     }
//   };

//   const stopVoiceInput = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsRecording(false);
//     setIsListening(false);
//     setInterimText('');
//   };

//   // Enhanced Camera functionality for PC compatibility
//   const openCamera = async () => {
//     try {
//       // Detect if we're on mobile or desktop
//       const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
//       // Set appropriate constraints based on device
//       const constraints = {
//         video: {
//           width: { ideal: isMobileDevice ? 1280 : 640 },
//           height: { ideal: isMobileDevice ? 720 : 480 },
//           facingMode: 'environment', // Always start with back camera
//         }
//       };
      
//       // Request camera permission
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
//       setCameraPermission('granted');
//       streamRef.current = stream;
//       setIsCameraOpen(true);
//       setFacingMode('environment'); // Ensure state is set to back camera
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
        
//         // Add event listener to handle when video is ready
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current.play().catch(err => {
//             console.error('Error playing video:', err);
//           });
//         };
//       }
//     } catch (err) {
//       console.error('Error accessing camera:', err);
//       setCameraPermission('denied');
//       alert('Failed to access camera. Please check your browser permissions.');
//     }
//   };

//   const closeCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }
//     setIsCameraOpen(false);
//   };

//   // Function to switch between front and back camera
//   const switchCamera = async () => {
//     const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
//     setFacingMode(newFacingMode);
    
//     // Close current stream
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
    
//     // Open camera with new facing mode
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           facingMode: newFacingMode,
//           width: { ideal: 1280 },
//           height: { ideal: 720 }
//         } 
//       });
      
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error('Error switching camera:', err);
//       // Revert to previous mode if switch fails
//       setFacingMode(facingMode);
//     }
//   };

//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const context = canvas.getContext('2d');
      
//       // Set canvas dimensions to match video
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
      
//       // Draw the current video frame to canvas
//       context.drawImage(video, 0, 0);
      
//       // Convert to base64 with high quality
//       const imageData = canvas.toDataURL('image/jpeg', 0.95);
//       setUploadedImage(imageData.split(',')[1]);
//       closeCamera();
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <form 
//         onSubmit={handleSubmit}
//         className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ${
//           isDragging ? 'border-[#bfff00] bg-[#bfff00]/5' : 'border-gray-800 bg-black/40'
//         } border backdrop-blur-xl`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         {uploadedImage ? (
//           // Enhanced Image Preview State
//           <div className="p-6">
//             <div className="relative">
//               <img 
//                 src={`data:image/jpeg;base64,${uploadedImage}`} 
//                 alt="Uploaded" 
//                 className="w-full h-80 object-cover rounded-2xl shadow-xl"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
//               <button
//                 type="button"
//                 onClick={removeImage}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
//               >
//                 <X size={18} />
//               </button>
//               <div className="absolute bottom-4 left-4 right-4">
//                 <p className="text-white text-sm font-medium">Image uploaded successfully</p>
//                 <p className="text-gray-300 text-xs">Click "Analyze Image" to process</p>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               className="mt-6 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
//             >
//               <span>Analyze Image</span>
//               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         ) : (
//           // Enhanced Text Input State
//           <div className="p-6">
//             {/* Mobile Layout */}
//             {isMobile ? (
//               <div className="space-y-4">
//                 {/* Action Buttons - Vertical Layout for Mobile */}
//                 <div className="flex justify-center gap-4 py-2">
//                   <button 
//                     type="button"
//                     onClick={() => fileInputRef.current.click()}
//                     className="flex flex-col items-center p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-xl transition-all duration-300 group"
//                     title="Upload Image"
//                   >
//                     <ImageUp size={20} className="group-hover:scale-110 transition-transform" />
//                     <span className="text-xs mt-1">Upload</span>
//                   </button>
                  
//                   <button 
//                     type="button"
//                     onClick={isRecording ? stopVoiceInput : startVoiceInput}
//                     className={`flex flex-col items-center p-3 ${
//                       isRecording || isListening 
//                         ? 'text-red-500 animate-pulse' 
//                         : micPermission === 'denied' 
//                           ? 'text-red-400' 
//                           : 'text-gray-400 hover:text-[#bfff00]'
//                     } hover:bg-gray-800/60 rounded-xl transition-all duration-300 group`}
//                     title={micPermission === 'denied' ? 'Microphone access denied' : 'Voice Input'}
//                   >
//                     <Mic size={20} className="group-hover:scale-110 transition-transform" />
//                     <span className="text-xs mt-1">Voice</span>
//                   </button>
                  
//                   <button 
//                     type="button"
//                     onClick={openCamera}
//                     className={`flex flex-col items-center p-3 ${
//                       cameraPermission === 'denied' 
//                         ? 'text-red-400' 
//                         : 'text-gray-400 hover:text-[#bfff00]'
//                     } hover:bg-gray-800/60 rounded-xl transition-all duration-300 group`}
//                     title={cameraPermission === 'denied' ? 'Camera access denied' : 'Use Camera'}
//                   >
//                     <Camera size={20} className="group-hover:scale-110 transition-transform" />
//                     <span className="text-xs mt-1">Camera</span>
//                   </button>
//                 </div>

//                 {/* Text Area for Mobile */}
//                 <div className="relative">
//                   <textarea
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         handleSubmit(e);
//                       }
//                     }}
//                     placeholder="Scan a label or paste ingredients..."
//                     className="w-full bg-transparent border-none text-white placeholder:text-gray-600 focus:ring-0 focus:outline-none resize-none py-3 px-4 max-h-32 min-h-[60px] scrollbar-hide text-base rounded-2xl border border-gray-800 focus:border-gray-600 transition-all duration-300 font-['Mona_Sans']"
//                     rows={1}
//                   />
                  
//                   {/* Enhanced Voice transcription indicator */}
//                   {isListening && (
//                     <div className="absolute -top-8 left-0 text-xs text-[#bfff00] flex items-center gap-1">
//                       <div className="w-2 h-2 bg-[#bfff00] rounded-full animate-pulse" />
//                       Listening...
//                       {interimText && (
//                         <span className="text-gray-400 italic">"{interimText}"</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit Button for Mobile */}
//                 <button 
//                   type="submit"
//                   disabled={!text.trim()}
//                   className={`w-full py-3 px-6 rounded-2xl transition-all duration-300 ${
//                     text.trim() 
//                       ? "bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25" 
//                       : "bg-gray-800 text-gray-600 cursor-not-allowed"
//                   }`}
//                 >
//                   Analyze
//                 </button>

//                 {/* Quick Actions - Only Paste Ingredients for Mobile */}
//                 <div className="flex justify-center pt-2">
//                   <button 
//                     type="button"
//                     onClick={handlePaste}
//                     className="text-sm text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group"
//                   >
//                     {pasteSuccess ? (
//                       <>
//                         <Check size={14} className="text-green-400" />
//                         <span className="text-green-400">Pasted!</span>
//                       </>
//                     ) : (
//                       <>
//                         <FileText size={14} className="group-hover:scale-110 transition-transform" />
//                         <span>Paste ingredients</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               /* Desktop Layout */
//               <div className="flex items-end gap-3 pb-3">
//                 <input 
//                   type="file" 
//                   ref={fileInputRef} 
//                   accept="image/*" 
//                   className="hidden" 
//                   onChange={handleFileChange}
//                 />

//                 {/* LEFT: Action Buttons */}
//                 <div className="flex items-center gap-1">
//                   <button 
//                     type="button"
//                     onClick={() => fileInputRef.current.click()}
//                     className="p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-full transition-all duration-300 group"
//                     title="Upload Image"
//                   >
//                     <ImageUp size={20} className="group-hover:scale-110 transition-transform" />
//                   </button>
                  
//                   <button 
//                     type="button"
//                     onClick={isRecording ? stopVoiceInput : startVoiceInput}
//                     className={`p-3 ${
//                       isRecording || isListening 
//                         ? 'text-red-500 animate-pulse' 
//                         : micPermission === 'denied' 
//                           ? 'text-red-400' 
//                           : 'text-gray-400 hover:text-[#bfff00]'
//                     } hover:bg-gray-800/60 rounded-full transition-all duration-300 group`}
//                     title={micPermission === 'denied' ? 'Microphone access denied' : 'Voice Input'}
//                   >
//                     <Mic size={20} className="group-hover:scale-110 transition-transform" />
//                   </button>
                  
//                   <button 
//                     type="button"
//                     onClick={openCamera}
//                     className={`p-3 ${
//                       cameraPermission === 'denied' 
//                         ? 'text-red-400' 
//                         : 'text-gray-400 hover:text-[#bfff00]'
//                     } hover:bg-gray-800/60 rounded-full transition-all duration-300 group`}
//                     title={cameraPermission === 'denied' ? 'Camera access denied' : 'Use Camera'}
//                   >
//                     <Camera size={20} className="group-hover:scale-110 transition-transform" />
//                   </button>
//                 </div>

//                 {/* CENTER: Text Area */}
//                 <div className="flex-1 relative">
//                   <textarea
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         handleSubmit(e);
//                       }
//                     }}
//                     placeholder="Scan a label or paste ingredients..."
//                     className="w-full bg-transparent border-none text-white placeholder:text-gray-600 focus:ring-0 focus:outline-none resize-none py-3 px-4 max-h-32 min-h-[60px] scrollbar-hide text-lg rounded-2xl border border-gray-800 focus:border-gray-600 transition-all duration-300 font-[font2]"
//                     rows={1}
//                   />
//                   <div className="absolute bottom-3 right-3 text-xs text-gray-600">
//                     {text.length}/500
//                   </div>
                  
//                   {/* Enhanced Voice transcription indicator */}
//                   {isListening && (
//                     <div className="absolute -top-8 left-0 text-xs text-[#bfff00] flex items-center gap-1">
//                       <div className="w-2 h-2 bg-[#bfff00] rounded-full animate-pulse" />
//                       Listening...
//                       {interimText && (
//                         <span className="text-gray-400 italic">"{interimText}"</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* RIGHT: Submit Button */}
//                 <button 
//                   type="submit"
//                   disabled={!text.trim()}
//                   className={`p-3 rounded-full transition-all duration-300 ${
//                     text.trim() 
//                       ? "bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black shadow-lg hover:shadow-[#bfff00]/25 hover:scale-105" 
//                       : "bg-gray-800 text-gray-600 cursor-not-allowed"
//                   }`}
//                 >
//                   <ArrowRight size={18} />
//                 </button>
//               </div>
//             )}
            
//             {/* Quick Actions - Desktop Only */}
//             {!isMobile && (
//               <div className="flex items-center gap-2 pt-2">
//                 <button 
//                   type="button"
//                   onClick={handlePaste}
//                   className="text-xs text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group"
//                 >
//                   {pasteSuccess ? (
//                     <>
//                       <Check size={14} className="text-green-400" />
//                       <span className="text-green-400">Pasted!</span>
//                     </>
//                   ) : (
//                     <>
//                       <FileText size={14} className="group-hover:scale-110 transition-transform" />
//                       <span>Paste ingredients</span>
//                     </>
//                   )}
//                 </button>
//                 <span className="text-gray-700">•</span>
//                 <button 
//                   type="button"
//                   onClick={() => fileInputRef.current.click()}
//                   className="text-xs text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group"
//                 >
//                   <ImageUp size={14} className="group-hover:scale-110 transition-transform" />
//                   <span>Upload photo</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </form>

//       {/* Enhanced Camera Modal */}
//       {isCameraOpen && (
//         <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-4xl w-full">
//             {/* Close button */}
//             <button
//               onClick={closeCamera}
//               className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors z-10"
//             >
//               <X size={24} />
//             </button>
            
//             {/* Video preview with proper sizing */}
//             <div className="relative bg-black rounded-2xl overflow-hidden">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="w-full h-auto max-h-[70vh] object-contain"
//               />
              
//               {/* Camera info */}
//               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg">
//                 <p className="text-white text-xs">
//                   {facingMode === 'environment' ? '📷 Back Camera' : '🤳 Front Camera'}
//                 </p>
//               </div>
              
//               {/* Controls overlay */}
//               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
//                 <div className="flex items-center justify-center gap-4">
//                   {/* Switch camera button */}
//                   <button
//                     onClick={switchCamera}
//                     className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
//                   >
//                     <RotateCw size={20} className="text-white" />
//                   </button>
                  
//                   {/* Capture button */}
//                   <button
//                     onClick={capturePhoto}
//                     className="p-4 bg-white rounded-full hover:bg-gray-200 transition-all duration-300 group hover:scale-110"
//                   >
//                     <Camera size={24} className="text-black group-hover:scale-110 transition-transform" />
//                   </button>
                  
//                   {/* Cancel button */}
//                   <button
//                     onClick={closeCamera}
//                     className="p-3 bg-red-500/80 backdrop-blur-md rounded-full hover:bg-red-600 transition-colors"
//                   >
//                     <VideoOff size={20} className="text-white" />
//                   </button>
//                 </div>
//                 <p className="text-center text-white text-sm mt-4">
//                   Position the label in the frame and tap the camera button
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Hidden canvas for photo capture */}
//       <canvas ref={canvasRef} className="hidden" />

//       {/* Enhanced Drag Overlay */}
//       {isDragging && (
//         <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#bfff00] z-10">
//           <div className="text-center space-y-4 p-8">
//             <div className="p-4 rounded-full bg-[#bfff00]/10 border border-[#bfff00]/20 mx-auto w-fit">
//               <ImageUp className="w-12 h-12 text-[#bfff00]" />
//             </div>
//             <p className="text-[#bfff00] font-medium text-lg">Drop your image here</p>
//             <p className="text-gray-400 text-sm">or click to browse</p>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <p className="text-sm text-gray-500">
//           Tattva AI can make mistakes. Check important info.
//         </p>
//       </div>
//     </div>
//   );
// }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//=========================================================================================================================================

// GEMINI INPUT COMPONENT---  USES GROQ!

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//=========================================================================================================================================


import { useState, useRef, useEffect } from "react";
import { Camera, ImageUp, ArrowRight, X, FileText, Mic, Check, RotateCw, VideoOff, Loader2 } from "lucide-react";

export default function Input({ onAnalyze }) {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // Voice States
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for API wait time
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [micPermission, setMicPermission] = useState('prompt');
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [facingMode, setFacingMode] = useState('user');
  const [typingQueue, setTypingQueue] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  // Refs for Audio Recording
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Camera Stream Logic
  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(e => console.error("Error playing video:", e));
    }
  }, [isCameraOpen]);

  // Typewriter effect logic
  useEffect(() => {
    if (typingQueue.length > 0) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + typingQueue[0]);
        setTypingQueue((prev) => prev.slice(1));
      }, 30); // Speed up slightly for long API responses
      return () => clearTimeout(timeout);
    }
  }, [typingQueue]);

  const checkPermissions = async () => {
    try {
      const micResult = await navigator.permissions.query({ name: 'microphone' });
      setMicPermission(micResult.state);
      micResult.addEventListener('change', () => setMicPermission(micResult.state));

      const cameraResult = await navigator.permissions.query({ name: 'camera' });
      setCameraPermission(cameraResult.state);
      cameraResult.addEventListener('change', () => setCameraPermission(cameraResult.state));
    } catch (err) {
      console.log('Permission API not supported');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() || uploadedImage) {
      if (uploadedImage) {
        onAnalyze(uploadedImage, 'image');
      } else {
        onAnalyze(text, 'text');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setUploadedImage(null);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText.trim()) {
        setText(prev => prev + (prev ? " " : "") + clipboardText);
        setPasteSuccess(true);
        setTimeout(() => setPasteSuccess(false), 2000);
      }
    } catch (err) {
      // Fallback paste logic...
      const textArea = document.createElement('textarea');
      textArea.value = '';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('paste');
        if (textArea.value.trim()) {
          setText(prev => prev + (prev ? " " : "") + textArea.value);
          setPasteSuccess(true);
          setTimeout(() => setPasteSuccess(false), 2000);
        }
      } catch (err) {}
      document.body.removeChild(textArea);
    }
  };

  // ---------------------------------------------------------
  // 🎙️ NEW: GROQ API VOICE LOGIC
  // ---------------------------------------------------------
  
  const startVoiceInput = async () => {
    if (isRecording) {
      stopVoiceInput();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission('granted');

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true); // Show loading spinner
        
        // 1. Create Audio Blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // 2. Prepare Form Data for Groq
        const formData = new FormData();
        // Groq requires a filename with an extension
        formData.append("file", audioBlob, "recording.webm"); 
        formData.append("model", "whisper-large-v3");

        try {
          // 3. Send to Groq API
          const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            },
            body: formData,
          });

          const data = await response.json();

          if (data.text) {
            // Add space if there is existing text
            const spacing = text.length > 0 ? " " : "";
            // Use your typing queue effect
            setTypingQueue(prev => prev + spacing + data.text); 
          } else {
            console.error("Groq API Error:", data);
            alert("Could not transcribe audio.");
          }
        } catch (error) {
          console.error("Transcription failed:", error);
          alert("Transcription failed. Check your API Key or connection.");
        } finally {
          setIsProcessing(false);
          // Stop all audio tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);

    } catch (err) {
      console.error("Mic Access Error:", err);
      setMicPermission('denied');
      alert('Failed to access microphone.');
    }
  };

  const stopVoiceInput = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop(); // This triggers onstop above
      setIsRecording(false);
    }
  };

  // ---------------------------------------------------------
  // 📸 CAMERA LOGIC (Unchanged)
  // ---------------------------------------------------------

  const openCamera = async () => {
    try {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const constraints = {
        video: {
          width: { ideal: isMobileDevice ? 1280 : 640 },
          height: { ideal: isMobileDevice ? 720 : 480 },
          facingMode: isMobileDevice ? 'environment' : 'user', 
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraPermission('granted');
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (err) {
      setCameraPermission('denied');
      alert('Failed to access camera.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const switchCamera = async () => {
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: newFacingMode, width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(console.error);
      }
    } catch (err) {
      setFacingMode(facingMode);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg', 0.95);
      setUploadedImage(imageData.split(',')[1]);
      closeCamera();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 ${
          isDragging ? 'border-[#bfff00] bg-[#bfff00]/5' : 'border-gray-800 bg-black/40'
        } border backdrop-blur-xl`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />

        {uploadedImage ? (
          // IMAGE PREVIEW
          <div className="p-4 md:p-6">
            <div className="relative">
              <img 
                src={`data:image/jpeg;base64,${uploadedImage}`} 
                alt="Uploaded" 
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur-md border border-gray-700 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                <X size={18} />
              </button>
            </div>
            
            <button
              type="submit"
              className="mt-6 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg hover:shadow-[#bfff00]/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Analyze Image</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          // TEXT INPUT
          <div className="p-4 md:p-6">
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="space-y-4">
                <div className="flex justify-center gap-4 py-2">
                  <button type="button" onClick={() => fileInputRef.current.click()} className="flex flex-col items-center p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-xl transition-all duration-300 group">
                    <ImageUp size={20} className="group-hover:scale-110 transition-transform" /><span className="text-xs mt-1">Upload</span>
                  </button>
                  
                  {/* MIC BUTTON MOBILE */}
                  <button 
                    type="button" 
                    onClick={startVoiceInput} 
                    disabled={isProcessing}
                    className={`flex flex-col items-center p-3 ${
                      isRecording ? 'text-red-500 animate-pulse' : 
                      isProcessing ? 'text-[#bfff00] animate-pulse' : 
                      'text-gray-400 hover:text-[#bfff00]'
                    } hover:bg-gray-800/60 rounded-xl transition-all duration-300 group`}
                  >
                    {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} className="group-hover:scale-110 transition-transform" />}
                    <span className="text-xs mt-1">{isRecording ? 'Stop' : isProcessing ? '...' : 'Voice'}</span>
                  </button>
                  
                  <button type="button" onClick={openCamera} className="flex flex-col items-center p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-xl transition-all duration-300 group">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" /><span className="text-xs mt-1">Camera</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Scan a label or paste ingredients..."
                    className="w-full bg-transparent border-none text-white placeholder:text-gray-600 focus:ring-0 focus:outline-none resize-none py-3 px-4 max-h-32 min-h-[60px] scrollbar-hide text-base rounded-2xl border border-gray-800 focus:border-gray-600 transition-all duration-300 font-[font2]"
                    rows={1}
                  />
                  {isRecording && (
                    <div className="absolute -top-6 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-red-500/30 text-xs text-red-400 flex items-center gap-2 backdrop-blur-md z-10">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Recording...
                    </div>
                  )}
                  {isProcessing && (
                    <div className="absolute -top-6 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-[#bfff00]/30 text-xs text-[#bfff00] flex items-center gap-2 backdrop-blur-md z-10">
                      <Loader2 size={12} className="animate-spin" />
                      Processing audio...
                    </div>
                  )}
                </div>

                <button type="submit" disabled={!text.trim()} className={`w-full py-3 px-6 rounded-2xl transition-all duration-300 ${text.trim() ? "bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black font-bold shadow-lg" : "bg-gray-800 text-gray-600 cursor-not-allowed"}`}>
                  Analyze
                </button>
                <div className="flex justify-center pt-2">
                  <button type="button" onClick={handlePaste} className="text-sm text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group">
                    {pasteSuccess ? <><Check size={14} className="text-green-400" /><span className="text-green-400">Pasted!</span></> : <><FileText size={14} className="group-hover:scale-110 transition-transform" /><span>Paste ingredients</span></>}
                  </button>
                </div>
              </div>
            ) : (
              /* Desktop Layout */
              <div className="flex items-end gap-3 pb-3">
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => fileInputRef.current.click()} className="p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-full transition-all duration-300 group">
                    <ImageUp size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  
                  {/* MIC BUTTON DESKTOP */}
                  <button 
                    type="button" 
                    onClick={startVoiceInput} 
                    disabled={isProcessing}
                    className={`p-3 ${
                      isRecording ? 'text-red-500 animate-pulse' : 
                      isProcessing ? 'text-[#bfff00] animate-pulse' : 
                      'text-gray-400 hover:text-[#bfff00]'
                    } hover:bg-gray-800/60 rounded-full transition-all duration-300 group`}
                  >
                    {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} className="group-hover:scale-110 transition-transform" />}
                  </button>
                  
                  <button type="button" onClick={openCamera} className="p-3 text-gray-400 hover:text-[#bfff00] hover:bg-gray-800/60 rounded-full transition-all duration-300 group">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                <div className="flex-1 relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Scan a label or paste ingredients..."
                    className="w-full bg-transparent border-none text-white placeholder:text-gray-600 focus:ring-0 focus:outline-none resize-none py-3 px-4 max-h-32 min-h-[60px] scrollbar-hide text-lg rounded-2xl border border-gray-800 focus:border-gray-600 transition-all duration-300 font-[font2]"
                    rows={1}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-600">
                    {text.length}/500
                  </div>
                  
                  {isRecording && (
                    <div className="absolute -top-6 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-red-500/30 text-xs text-red-400 flex items-center gap-2 backdrop-blur-md z-10">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      Recording...
                    </div>
                  )}
                  {isProcessing && (
                    <div className="absolute -top-6 left-4 px-3 py-1.5 rounded-full bg-black/80 border border-[#bfff00]/30 text-xs text-[#bfff00] flex items-center gap-2 backdrop-blur-md z-10">
                      <Loader2 size={12} className="animate-spin" />
                      Processing audio...
                    </div>
                  )}
                </div>

                <button type="submit" disabled={!text.trim()} className={`p-3 rounded-full transition-all duration-300 ${text.trim() ? "bg-gradient-to-r from-[#bfff00] to-[#D3FD50] text-black shadow-lg hover:shadow-[#bfff00]/25 hover:scale-105" : "bg-gray-800 text-gray-600 cursor-not-allowed"}`}>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            
            {!isMobile && (
              <div className="flex items-center gap-2 pt-2">
                <button type="button" onClick={handlePaste} className="text-xs text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group">
                  {pasteSuccess ? <><Check size={14} className="text-green-400" /><span className="text-green-400">Pasted!</span></> : <><FileText size={14} className="group-hover:scale-110 transition-transform" /><span>Paste ingredients</span></>}
                </button>
                <span className="text-gray-700">•</span>
                <button type="button" onClick={() => fileInputRef.current.click()} className="text-xs text-gray-500 hover:text-[#bfff00] transition-colors flex items-center gap-1 group">
                  <ImageUp size={14} className="group-hover:scale-110 transition-transform" /><span>Upload photo</span>
                </button>
              </div>
            )}
          </div>
        )}
      </form>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button onClick={closeCamera} className="absolute -top-12 right-0 p-2 text-gray-400 hover:text-white transition-colors z-10"><X size={24} /></button>
            <div className="relative bg-black rounded-2xl overflow-hidden">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto max-h-[70vh] object-contain" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg"><p className="text-white text-xs">{facingMode === 'environment' ? '📷 Back Camera' : '🤳 Front Camera'}</p></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-center gap-4">
                  <button onClick={switchCamera} className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"><RotateCw size={20} className="text-white" /></button>
                  <button onClick={capturePhoto} className="p-4 bg-white rounded-full hover:bg-gray-200 transition-all duration-300 group hover:scale-110"><Camera size={24} className="text-black group-hover:scale-110 transition-transform" /></button>
                  <button onClick={closeCamera} className="p-3 bg-red-500/80 backdrop-blur-md rounded-full hover:bg-red-600 transition-colors"><VideoOff size={20} className="text-white" /></button>
                </div>
                <p className="text-center text-white text-sm mt-4">Position the label in the frame and tap the camera button</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
      {isDragging && <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#bfff00] z-10"><div className="text-center space-y-4 p-8"><div className="p-4 rounded-full bg-[#bfff00]/10 border border-[#bfff00]/20 mx-auto w-fit"><ImageUp className="w-12 h-12 text-[#bfff00]" /></div><p className="text-[#bfff00] font-medium text-lg">Drop your image here</p><p className="text-gray-400 text-sm">or click to browse</p></div></div>}
      <div className="mt-6 text-center"><p className="text-sm text-gray-500">Tattva AI can make mistakes. Check important info.</p></div>
    </div>
  );
}