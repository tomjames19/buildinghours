/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBuilding = `mutation CreateBuilding($input: CreateBuildingInput!) {
  createBuilding(input: $input) {
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
export const updateBuilding = `mutation UpdateBuilding($input: UpdateBuildingInput!) {
  updateBuilding(input: $input) {
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
export const deleteBuilding = `mutation DeleteBuilding($input: DeleteBuildingInput!) {
  deleteBuilding(input: $input) {
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
export const createSchedule = `mutation CreateSchedule($input: CreateScheduleInput!) {
  createSchedule(input: $input) {
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
export const updateSchedule = `mutation UpdateSchedule($input: UpdateScheduleInput!) {
  updateSchedule(input: $input) {
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
export const deleteSchedule = `mutation DeleteSchedule($input: DeleteScheduleInput!) {
  deleteSchedule(input: $input) {
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
export const createDay = `mutation CreateDay($input: CreateDayInput!) {
  createDay(input: $input) {
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
export const updateDay = `mutation UpdateDay($input: UpdateDayInput!) {
  updateDay(input: $input) {
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
export const deleteDay = `mutation DeleteDay($input: DeleteDayInput!) {
  deleteDay(input: $input) {
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
