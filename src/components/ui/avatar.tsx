import * as React from 'react';

import { cn } from '../../lib/utils';

type AvatarContextValue = {
  hasImage: boolean;
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const AvatarContext = React.createContext<AvatarContextValue | null>(null);

type AvatarProps = React.HTMLAttributes<HTMLSpanElement>;

export function Avatar({ className, ...props }: AvatarProps) {
  const [hasImage, setHasImage] = React.useState(true);

  return (
    <AvatarContext.Provider value={{ hasImage, setHasImage }}>
      <span className={cn('relative flex shrink-0 overflow-hidden rounded-full', className)} {...props} />
    </AvatarContext.Provider>
  );
}

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function AvatarImage({ className, onError, ...props }: AvatarImageProps) {
  const context = React.useContext(AvatarContext);

  return (
    <img
      className={cn('aspect-square h-full w-full object-cover', className)}
      onError={(event) => {
        context?.setHasImage(false);
        onError?.(event);
      }}
      {...props}
    />
  );
}

type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>;

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const context = React.useContext(AvatarContext);

  if (context?.hasImage) {
    return null;
  }

  return <span className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted', className)} {...props} />;
}
