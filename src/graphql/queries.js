/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBuilding = `query GetBuilding($id: ID!) {
  getBuilding(id: $id) {
    id
    name
    schedules {
      items {
        id
        schedule_name
        start_date
        end_date
        default_schedule
      }
      nextToken
    }
  }
}
`;
export const listBuildings = `query ListBuildings(
  $filter: ModelBuildingFilterInput
  $limit: Int
  $nextToken: String
) {
  listBuildings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      schedules {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getSchedule = `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    schedule_name
    start_date
    end_date
    default_schedule
    days {
      items {
        id
        day_name
        opening_time
        closing_time
        closed
        order
      }
      nextToken
    }
    building {
      id
      name
      schedules {
        nextToken
      }
    }
  }
}
`;
export const listSchedules = `query ListSchedules(
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      schedule_name
      start_date
      end_date
      default_schedule
      days {
        nextToken
      }
      building {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getDay = `query GetDay($id: ID!) {
  getDay(id: $id) {
    id
    day_name
    opening_time
    closing_time
    closed
    schedule {
      id
      schedule_name
      start_date
      end_date
      default_schedule
      days {
        nextToken
      }
      building {
        id
        name
      }
    }
    order
  }
}
`;
export const listDays = `query ListDays($filter: ModelDayFilterInput, $limit: Int, $nextToken: String) {
  listDays(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      day_name
      opening_time
      closing_time
      closed
      schedule {
        id
        schedule_name
        start_date
        end_date
        default_schedule
      }
      order
    }
    nextToken
  }
}
`;
