export const listBuildings = `query ListBuildings($filter: ModelBuildingFilterInput) {
  listBuildings(filter: $filter) {
    items {
        id
        name
        schedules {
          items {
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
            }
          }
        }
    }
  }  
}`

export const createBuilding = `mutation CreateBuilding($name: String!) {
  createBuilding(input: {name: $name}){
    id
    name
  }
}`

export const deleteBuilding = `mutation DeleteBuilding($id: ID!) {
  deleteBuilding(input: {id: $id}){
    id
  }
}`

export const deleteSchedule = `mutation DeleteSchedule($id: ID!) {
  deleteSchedule(input: {id: $id}){
    id
    schedule_name
    days {
      items {
        id
        day_name
      }
    }
  }
}`

export const deleteDay = `mutation DeleteDay($id: ID!) {
  deleteDay(input: {id: $id}) {
    id
    day_name
  }
}`

export const createSchedule = `mutation CreateSchedule($schedule_name: String!, $start_date: String!, $end_date: String!, $scheduleBuildingId: ID! $default_schedule: Boolean!) {
  createSchedule(input: {schedule_name: $schedule_name, start_date: $start_date, end_date: $end_date, scheduleBuildingId: $scheduleBuildingId, default_schedule: $default_schedule}){
    id
    schedule_name
    start_date
    end_date
    default_schedule
    building {
      id
      name
      schedules {
        items {
          id
          schedule_name
          start_date
          end_date
        }
      }
    }
  }
}`

export const updateSchedule = `mutation UpdateSchedule($id: ID!, $schedule_name: String! $start_date: String!, $end_date: String! $default_schedule: Boolean!) {
  updateSchedule(input: {id: $id, schedule_name: $schedule_name, start_date: $start_date, end_date: $end_date, default_schedule: $default_schedule}) {
    id
    schedule_name
    start_date
    end_date
    default_schedule
    building {
      id
      name
      schedules {
        items {
          id
          schedule_name
          start_date
          end_date
          days {
            items {
              id
              day_name
              opening_time
              closing_time
              closed
              order
            }
          }
        }
      }
    }
  }
}`

export const createDay = `mutation CreateDay($day_name: String!, $opening_time: String!, $closing_time: String!, $scheduleday: ID!, $closed: Boolean!, $order: Int!) {
  createDay(input: {day_name: $day_name, opening_time: $opening_time, closing_time: $closing_time, dayScheduleId: $scheduleday, closed: $closed, order: $order}) {
    schedule {
      building {
        id
        name
        schedules {
          items {
            id
            schedule_name
            start_date
            end_date
            days {
              items {
                id
                day_name
                opening_time
                closing_time
                closed
                order
              }
            }
          }
        }
      }
    }
  }
}`

export const updateDay = `mutation UpdateDay($id: ID!, $day_name: String!, $opening_time: String!, $closing_time: String!, $closed: Boolean!, $order: Int!) {
  updateDay(input: {id: $id, day_name: $day_name, opening_time: $opening_time, closing_time: $closing_time, closed: $closed, order: $order}) {
    schedule {
      building {
        id
        name
        schedules {
          items {
            id
            schedule_name
            start_date
            end_date
            days {
              items {
                id
                day_name
                opening_time
                closing_time
                closed
                order
              }
            }
          }
        }
      }
    }
  }
}`