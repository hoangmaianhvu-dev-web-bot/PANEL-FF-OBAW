import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, AnimatePresence } from 'motion/react';
import { Settings, Youtube, MessageCircle, HelpCircle, X, Bell, Ghost, Palette, ShieldAlert, Zap, Crosshair, Wifi } from 'lucide-react';

export default function WebSimulation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    regedit2: false,
    regedit4: false,
    nhetam: false,
    fixrung: false,
    fixlag: false,
    buffman: false,
    antiban: false,
    aimdrag: false,
    fakeaim: false,
    dns: false,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [menuBgColor, setMenuBgColor] = useState('rgba(10, 10, 10, 0.9)');
  const [menuTextColor, setMenuTextColor] = useState('#FFD700');
  const [clickCount, setClickCount] = useState(0);

  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const toggleSwitch = (key: string, label: string) => {
    setSwitches((prev) => {
      const newState = !prev[key];
      setToastMessage(`Đã ${newState ? 'bật' : 'tắt'} ${label}`);
      return { ...prev, [key]: newState };
    });
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleMenuHeaderClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setIsMenuVisible(false);
        setIsOpen(false);
        setToastMessage("Đã tắt Menu hoàn toàn!");
        return 0;
      }
      return newCount;
    });
  };

  const SwitchItem = ({ id, label }: { id: string; label: string }) => (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-200">{label}</span>
      <button
        onClick={() => toggleSwitch(id, label)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          switches[id] ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            switches[id] ? 'translate-x-4.5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const handleOpenMenu = () => {
    if (hasPermission) {
      setIsMenuVisible(true);
      setIsOpen(true);
      setToastMessage("Đang hiển thị đè lên ứng dụng khác...");
    } else {
      setShowPermissionDialog(true);
    }
  };

  const handleGrantPermission = () => {
    setHasPermission(true);
    setShowPermissionDialog(false);
    setToastMessage("Đã cấp quyền Overlay thành công!");
  };

  return (
    <div 
      className={`relative w-full h-[calc(100vh-140px)] bg-cover bg-center rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-1000 ${
        isMenuVisible 
          ? "bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')]" 
          : "bg-[url('https://picsum.photos/seed/cyberpunk/1920/1080?blur=2')]"
      }`} 
      ref={constraintsRef}
    >
      {!isMenuVisible && (
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6"
          >
            <Ghost size={80} className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)]" />
          </motion.div>
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 animate-gradient-x mb-2 drop-shadow-lg uppercase tracking-widest">
            AVU DEV - PREMIUM
          </h1>
          <p className="text-yellow-500/80 font-mono text-sm mb-8 tracking-widest border border-yellow-500/30 px-4 py-1 rounded-full bg-yellow-500/10">
            Panel FF Obaw OB52
          </p>
          <p className="text-gray-300 mb-8 max-w-md drop-shadow-md text-sm leading-relaxed">
             AVU DEV - PREMIUM MOD MENU . Chào mừng bạn đến với PANEL OBAW FF OB52.                          
          </p>
          
          <div className="flex flex-col gap-4">
            {!hasPermission && (
              <button
                onClick={() => setShowPermissionDialog(true)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all border border-white/20 uppercase tracking-wider text-sm"
              >
                Yêu cầu quyền Overlay
              </button>
            )}
            <button
              onClick={handleOpenMenu}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-black rounded-full transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:scale-105 uppercase tracking-wider"
            >
              OPEN MENU PANEL FF OBAW
            </button>
          </div>
        </div>
      )}

      {/* Permission Dialog Simulation */}
      <AnimatePresence>
        {showPermissionDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4 text-yellow-500">
                <Settings size={24} />
                <h2 className="text-lg font-bold text-white">Cấp quyền hiển thị</h2>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Ứng dụng cần quyền "Hiển thị trên các ứng dụng khác" (Overlay) để có thể hiển thị Menu Mod khi bạn đang chơi game.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowPermissionDialog(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Từ chối
                </button>
                <button
                  onClick={handleGrantPermission}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                >
                  Cho phép
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMenuVisible && (
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragControls={dragControls}
          dragMomentum={false}
          initial={{ x: 20, y: 20 }}
          className="absolute z-50 flex flex-col gap-2"
          style={{ touchAction: 'none' }}
        >
          {/* Floating Icon */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 text-white hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Settings size={24} />}
          </motion.div>

          {/* Floating Menu */}
          {isOpen && (
            <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="w-72 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[65vh] relative"
            style={{ backgroundColor: menuBgColor }}
          >
            {/* Settings Overlay */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, x: '100%' }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: '100%' }}
                  className="absolute inset-0 z-20 bg-black/95 backdrop-blur-md p-4 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold">Tùy chỉnh Giao diện</h3>
                    <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">Màu nền Menu</label>
                      <div className="flex gap-2">
                        {['rgba(10, 10, 10, 0.9)', 'rgba(15, 23, 42, 0.9)', 'rgba(69, 10, 10, 0.9)', 'rgba(20, 83, 45, 0.9)'].map(color => (
                          <button
                            key={color}
                            onClick={() => setMenuBgColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ${menuBgColor === color ? 'border-white' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-2">Màu chữ Tiêu đề</label>
                      <div className="flex gap-2">
                        {['#FFD700', '#00FF00', '#FF0000', '#00FFFF', '#FFFFFF'].map(color => (
                          <button
                            key={color}
                            onClick={() => setMenuTextColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ${menuTextColor === color ? 'border-white' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div 
              className="p-4 border-b border-white/10 bg-gradient-to-r from-black/50 to-transparent cursor-grab active:cursor-grabbing relative overflow-hidden" 
              onPointerDown={(e) => dragControls.start(e)}
              onClick={handleMenuHeaderClick}
            >
              {/* Animated Mascot in Header */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20"
              >
                <Ghost size={40} style={{ color: menuTextColor }} />
              </motion.div>

              <h2 
                className="text-xl font-black text-center tracking-wider animate-pulse-slow drop-shadow-md"
                style={{ color: menuTextColor }}
              >
                Panel FF Obaw OB52
              </h2>
              <div className="flex justify-center mt-1.5">
                <span className="text-[10px] font-mono font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/30 px-3 py-0.5 rounded-full tracking-widest uppercase shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                  AVUDEV - FREE
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="space-y-6">
                {/* Group 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crosshair size={14} className="text-red-500" />
                    <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider">HỆ THỐNG AIMBOT</h3>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <SwitchItem id="regedit2" label="Regedit 2.0" />
                    <SwitchItem id="regedit4" label="Regedit 4.0" />
                    <SwitchItem id="nhetam" label="Nhẹ tâm 1.0" />
                    <SwitchItem id="aimdrag" label="AimDrag 1.0" />
                    <SwitchItem id="fakeaim" label="Fake Aim Data 2.1" />
                  </div>
                </div>

                {/* Group 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-yellow-400" />
                    <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider">TỐI ƯU HIỆU NĂNG</h3>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <SwitchItem id="fixrung" label="Fix rung 1.0" />
                    <SwitchItem id="fixlag" label="Fix lag 1.0" />
                    <SwitchItem id="buffman" label="Buff màn 1.1" />
                  </div>
                </div>

                {/* Group 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert size={14} className="text-green-400" />
                    <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider">BẢO MẬT & ANTIBAN</h3>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <SwitchItem id="antiban" label="Antiban 2.0 VIP" />
                    <SwitchItem id="dns" label="DNS (Có thể gây lag)" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-white/10 bg-black/60 grid grid-cols-5 gap-1">
              <a href="#" className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-red-500">
                <Youtube size={16} className="mb-1" />
                <span className="text-[9px] font-medium">YouTube</span>
              </a>
              <a href="#" className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-blue-400">
                <MessageCircle size={16} className="mb-1" />
                <span className="text-[9px] font-medium">Telegram</span>
              </a>
              <a href="#" className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-green-400">
                <HelpCircle size={16} className="mb-1" />
                <span className="text-[9px] font-medium">Hỗ trợ</span>
              </a>
              <a href="#" className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-yellow-400">
                <Bell size={16} className="mb-1" />
                <span className="text-[9px] font-medium">Thông báo</span>
              </a>
              <button onClick={() => setShowSettings(true)} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-purple-400">
                <Palette size={16} className="mb-1" />
                <span className="text-[9px] font-medium">Cài đặt</span>
              </button>
            </div>
          </motion.div>
          )}
        </motion.div>
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
