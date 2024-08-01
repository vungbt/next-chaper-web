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
import Eye from './eye';
import EyeSlash from './eye-slash';
import EditIcon from './edit-icon';
import Trash from './trash';
import TrashSolid from './trash-solid';
import CaretDownSolid from './caret-down-solid';
import CaretUpSolid from './caret-up-solid';
import Notification from './notification';
import SidebarRight from './sidebar-right';
import SidebarLeft from './sidebar-left';
import Setting from './setting';
import SettingBold from './setting-bold';
import Search from './search';
import Graph from './graph';
import BoxAdd from './box-add';
import Add from './add';
import ArrowLeft from './arrow-left';
import Success from './success';
import Star from './star';
import Sort from './sort';
import GlobalSearch from './global-search';
import Danger from './danger';
import DangerSolid from './danger-solid';
import DateIcon from './date-icon';
import DocumentText from './document-text';

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
  | 'close'
  | 'eye'
  | 'eye-slash'
  | 'edit-icon'
  | 'trash'
  | 'trash-solid'
  | 'caret-up-solid'
  | 'caret-down-solid'
  | 'notification'
  | 'sidebar-right'
  | 'sidebar-left'
  | 'setting'
  | 'setting-bold'
  | 'search'
  | 'graph'
  | 'box-add'
  | 'add'
  | 'arrow-left'
  | 'sort'
  | 'star'
  | 'success'
  | 'global-search'
  | 'danger-solid'
  | 'danger'
  | 'date-icon'
  | 'document-text';

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
  },
  eye: (props: IconProps) => {
    return <Eye {...props} />;
  },
  'eye-slash': (props: IconProps) => {
    return <EyeSlash {...props} />;
  },
  'edit-icon': (props: IconProps) => {
    return <EditIcon {...props} />;
  },
  trash: (props: IconProps) => {
    return <Trash {...props} />;
  },
  'trash-solid': (props: IconProps) => {
    return <TrashSolid {...props} />;
  },
  'caret-down-solid': (props: IconProps) => {
    return <CaretDownSolid {...props} />;
  },
  'caret-up-solid': (props: IconProps) => {
    return <CaretUpSolid {...props} />;
  },
  notification: (props: IconProps) => {
    return <Notification {...props} />;
  },
  'sidebar-right': (props: IconProps) => {
    return <SidebarRight {...props} />;
  },
  'sidebar-left': (props: IconProps) => {
    return <SidebarLeft {...props} />;
  },
  setting: (props: IconProps) => {
    return <Setting {...props} />;
  },
  'setting-bold': (props: IconProps) => {
    return <SettingBold {...props} />;
  },
  search: (props: IconProps) => {
    return <Search {...props} />;
  },
  graph: (props: IconProps) => {
    return <Graph {...props} />;
  },
  'box-add': (props: IconProps) => {
    return <BoxAdd {...props} />;
  },
  add: (props: IconProps) => {
    return <Add {...props} />;
  },
  'arrow-left': (props: IconProps) => {
    return <ArrowLeft {...props} />;
  },
  sort: (props: IconProps) => {
    return <Sort {...props} />;
  },
  star: (props: IconProps) => {
    return <Star {...props} />;
  },
  success: (props: IconProps) => {
    return <Success {...props} />;
  },
  'global-search': (props: IconProps) => {
    return <GlobalSearch {...props} />;
  },
  danger: (props: IconProps) => {
    return <Danger {...props} />;
  },
  'danger-solid': (props: IconProps) => {
    return <DangerSolid {...props} />;
  },
  'date-icon': (props: IconProps) => {
    return <DateIcon {...props} />;
  },
  'document-text': (props: IconProps) => {
    return <DocumentText {...props} />;
  }
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  return <Icon {...reset} />;
};
