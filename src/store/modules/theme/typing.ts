export type ThemeLayout = 'left' | 'basic';

export interface ThemeState {
  layout: ThemeLayout;
  layoutCollapsed: boolean;
}