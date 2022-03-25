import { RosDebugState } from "../types/RosTopicStats";

export const getContent = (
  _: string,
  topicStats: RosDebugState
): (string | number)[] => {
  if (_ === "Estop status" && topicStats?.estop === undefined)
    return ["-", "unknown"];
  if (_ === "Estop status" && topicStats?.estop === true)
    return ["Enable", "bad"];
  if (_ === "Estop status" && topicStats?.estop === false)
    return ["Disable", "good"];

  if (
    _ === "Safety system power status" &&
    topicStats?.safetySystem === undefined
  )
    return ["-", "unknown"];
  if (_ === "Safety system power status" && topicStats?.safetySystem === true)
    return ["On", "good"];
  if (_ === "Safety system power status" && topicStats?.safetySystem === false)
    return ["Off", "bad"];

  if (_ === "CAN controller power" && topicStats?.canController === undefined)
    return ["-", "unknown"];
  if (_ === "CAN controller power" && topicStats?.canController === true)
    return ["On", "good"];
  if (_ === "CAN controller power" && topicStats?.canController === false)
    return ["Off", "bad"];

  return ["-", "unknown"];
};
