/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBuilding = `subscription OnCreateBuilding {
  onCreateBuilding {
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
export const onUpdateBuilding = `subscription OnUpdateBuilding {
  onUpdateBuilding {
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
export const onDeleteBuilding = `subscription OnDeleteBuilding {
  onDeleteBuilding {
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
export const onCreateSchedule = `subscription OnCreateSchedule {
  onCreateSchedule {
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
export const onUpdateSchedule = `subscription OnUpdateSchedule {
  onUpdateSchedule {
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
export const onDeleteSchedule = `subscription OnDeleteSchedule {
  onDeleteSchedule {
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
export const onCreateDay = `subscription OnCreateDay {
  onCreateDay {
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
export const onUpdateDay = `subscription OnUpdateDay {
  onUpdateDay {
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
export const onDeleteDay = `subscription OnDeleteDay {
  onDeleteDay {
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
