import { ModalWrap, ModalWrapProps } from '@/libraries/common';
import Image from 'next/image';

type ModalScrapPreviewProps = Omit<ModalWrapProps, 'children'> & {
  onClose?: () => void;
  images: string[];
};

export default function ModalScrapPreview({ onClose, isOpen, images }: ModalScrapPreviewProps) {
  return (
    <ModalWrap isOpen={isOpen} onClose={onClose}>
      {images.map((item, index) => (
        <div
          key={index}
          className="relative w-full md:w-[750px] lg:w-[850px] 2xl:w-[1050px] flex justify-center aspect-[1/1.5]"
        >
          <Image loading="lazy" fill src={item} alt="scrap-preview-image" />
        </div>
      ))}
    </ModalWrap>
  );
}
