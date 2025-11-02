import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export function LogoutModal({ isOpen, onClose, onConfirm, userName }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
        <div className="bg-gradient-to-br from-blue-50 to-white p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <AlertTriangle className="w-8 h-8 text-white" />
          </motion.div>
          
          <DialogHeader className="text-center space-y-3">
            <DialogTitle className="text-2xl text-gray-900">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              {userName ? (
                <>
                  <span className="block mb-2">Hi, <span className="text-blue-600">{userName}</span></span>
                  Are you sure you want to log out? You will need to sign in again to access your account.
                </>
              ) : (
                'Are you sure you want to log out? You will need to sign in again to access your account.'
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <Button
              onClick={onClose}
              variant="outline"
              className="h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg hover:shadow-xl"
            >
              Logout
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
