import { CSSProperties, FC } from 'react';
import Loading from './loading';
import LoadingV2 from './loading-v2';
import ArrowRight from './arrow-right';
import Login from './login';
import SearchNormal from './search-normal';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  strokeWidth?: number;
};

export type Icon = FC<IconProps>;

export type IconName = 'loading' | 'loading-v2' | 'arrow-right' | 'login' | 'search-normal';

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
  }
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} />;
};
