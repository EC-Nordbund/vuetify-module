import { UserVuetifyPreset } from "vuetify";


export interface Options extends Partial<UserVuetifyPreset> {
  customVariables?: string[];
  iconInjector?: {
    icons: { [name: string]: string; };
    components: { [name: string]: string[]; };
  } |
  false;
  iconFont?: string;
  font?: string |
  {
    family?: string | string[];
    size?: number;
  };
}
