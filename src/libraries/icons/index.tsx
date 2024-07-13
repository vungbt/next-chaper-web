import { CSSProperties, FC } from 'react';
import Loading from './loading';
import LoadingV2 from './loading-v2';
import ArrowRight from './arrow-right';
import Login from './login';
import SearchNormal from './search-normal';
import ImageIcon from './image-icon';
import CheckIcon from './check-icon';
import ChevronDown from './chevron-down';
import ChevronUp from './chevron-up';
import ChevronLeft from './chevron-left';
import ChevronRight from './chevron-right';
import Close from './close';
import CloseCircle from './close-circle';
import CloseCircleBold from './close-circle-bold';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  strokeWidth?: number;
};

export type Icon = FC<IconProps>;

export type IconName =
  | 'loading'
  | 'loading-v2'
  | 'arrow-right'
  | 'login'
  | 'search-normal'
  | 'image-icon'
  | 'check-icon'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'close-circle-bold'
  | 'close-circle'
  | 'close';

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  loading: (props: IconProps) => {
    return <Loading {...props} />;
  },
  'loading-v2': (props: IconProps) => {
    return <LoadingV2 {...props} />;
  },
  'arrow-right': (props: IconProps) => {
    return <ArrowRight {...props} />;
  },
  login: (props: IconProps) => {
    return <Login {...props} />;
  },
  'search-normal': (props: IconProps) => {
    return <SearchNormal {...props} />;
  },
  'image-icon': (props: IconProps) => {
    return <ImageIcon {...props} />;
  },
  'check-icon': (props: IconProps) => {
    return <CheckIcon {...props} />;
  },
  'chevron-down': (props: IconProps) => {
    return <ChevronDown {...props} />;
  },
  'chevron-up': (props: IconProps) => {
    return <ChevronUp {...props} />;
  },
  'chevron-left': (props: IconProps) => {
    return <ChevronLeft {...props} />;
  },
  'chevron-right': (props: IconProps) => {
    return <ChevronRight {...props} />;
  },
  close: (props: IconProps) => {
    return <Close {...props} />;
  },
  'close-circle': (props: IconProps) => {
    return <CloseCircle {...props} />;
  },
  'close-circle-bold': (props: IconProps) => {
    return <CloseCircleBold {...props} />;
  }
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} />;
};
