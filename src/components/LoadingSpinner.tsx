import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

export function LoadingSpinner({ fullScreen = false, message }: LoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  );
}
