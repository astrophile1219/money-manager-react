import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-6">

      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-4 cursor-pointer"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10" />
          ) : (
            <Image size={22} />
          )}
        </div>

        <p className="text-sm sm:text-base text-gray-700">
          {icon ? "Change icon" : "Pick icon"}
        </p>
      </div>

      {/* Emoji Picker Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="relative bg-white rounded-xl shadow-lg p-3 max-w-sm w-full">

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Picker */}
            <div className="max-h-[60vh] overflow-y-auto">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  onSelect(emoji?.imageUrl || "");
                  setIsOpen(false);
                }}
                width="100%"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
