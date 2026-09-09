import allianceSeason1operators from "../data/alliance/season1/operators.json";
import allianceSeason2operators from "../data/alliance/season2/operators.json";
import allianceSeason21operators from "../data/alliance/season2.1/operators.json";

import allianceSeason1bonds from "../data/alliance/season1/alliances.json";
import allianceSeason2bonds from "../data/alliance/season2/alliances.json";
import allianceSeason21bonds from "../data/alliance/season2.1/alliances.json";

import allianceSeason1items from "../data/alliance/season1/items.json";
import allianceSeason2items from "../data/alliance/season2/items.json";
import allianceSeason21items from "../data/alliance/season2.1/items.json";

import allianceSeason1bands from "../data/alliance/season1/strategies.json";
import allianceSeason2bands from "../data/alliance/season2/strategies.json";
import allianceSeason21bands from "../data/alliance/season2.1/strategies.json";

export function getOperatorsBySeason(season: string) {
  switch (season) {
    case "1": {
      return (allianceSeason1operators as any).operators;
    }
    case "2": {
      return (allianceSeason2operators as any).operators;
    }
    case "2.1": {
      return (allianceSeason21operators as any).operators;
    }
    default: {
      return (allianceSeason1operators as any).operators;
    }
  }
}

export function getAlliancesBySeason(season: string) {
  switch (season) {
    case "1": {
      return (allianceSeason1bonds as any).bondInfo;
    }
    case "2": {
      return (allianceSeason2bonds as any).bondInfo;
    }
    case "2.1": {
      return (allianceSeason21bonds as any).bondInfo;
    }
    default: {
      return (allianceSeason1bonds as any).bondInfo;
    }
  }
}

export function getItemsBySeason(season: string) {
  switch (season) {
    case "1": {
      return (allianceSeason1items as any).shopitems;
    }
    case "2": {
      return (allianceSeason2items as any).shopitems;
    }
    case "2.1": {
      return (allianceSeason21items as any).shopitems;
    }
    default: {
      return (allianceSeason1items as any).shopitems;
    }
  }
}

export function getStrategiesBySeason(season: string) {
  switch (season) {
    case "1": {
      return (allianceSeason1bands as any).bandInfo;
    }
    case "2": {
      return (allianceSeason2bands as any).bandInfo;
    }
    case "2.1": {
      return (allianceSeason21bands as any).bandInfo;
    }
    default: {
      return (allianceSeason1bands as any).bandInfo;
    }
  }
}
