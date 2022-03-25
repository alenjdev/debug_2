export interface RosTopicStats {
  name: string;
  state: string | number;
}

export interface RosDebug {
  debug_stats: RosTopicStats[];
}

export interface RosDebugState {
  estop: boolean | undefined;
  safetySystem: boolean | undefined;
  canController: boolean | undefined;
}
