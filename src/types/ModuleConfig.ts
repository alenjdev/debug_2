export interface ModuleConfig {
  debugItems: MonitoringSection[];
}

export interface MonitoringSection {
  name: string;
  state: string | number;
}
