// Simple in-memory database

interface Report {
    id: string;
    ngoId: string;
    month: string;
    peopleHelped: number;
    eventsConducted: number;
    fundsUtilized: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface DB {
    reports: Report[];
  }
  
  // Initialize with some sample data
  export const db: DB = {
    reports: [
      {
        id: "1",
        ngoId: "NGO001",
        month: "2023-10",
        peopleHelped: 250,
        eventsConducted: 5,
        fundsUtilized: 50000,
        createdAt: "2023-10-30T10:00:00Z",
        updatedAt: "2023-10-30T10:00:00Z",
      },
      {
        id: "2",
        ngoId: "NGO002",
        month: "2023-10",
        peopleHelped: 175,
        eventsConducted: 3,
        fundsUtilized: 35000,
        createdAt: "2023-10-29T14:30:00Z",
        updatedAt: "2023-10-29T14:30:00Z",
      },
      {
        id: "3",
        ngoId: "NGO003",
        month: "2023-10",
        peopleHelped: 320,
        eventsConducted: 7,
        fundsUtilized: 65000,
        createdAt: "2023-10-31T09:15:00Z",
        updatedAt: "2023-10-31T09:15:00Z",
      },
      {
        id: "4",
        ngoId: "NGO001",
        month: "2023-11",
        peopleHelped: 280,
        eventsConducted: 6,
        fundsUtilized: 55000,
        createdAt: "2023-11-30T11:20:00Z",
        updatedAt: "2023-11-30T11:20:00Z",
      },
      {
        id: "5",
        ngoId: "NGO002",
        month: "2023-11",
        peopleHelped: 190,
        eventsConducted: 4,
        fundsUtilized: 40000,
        createdAt: "2023-11-29T15:45:00Z",
        updatedAt: "2023-11-29T15:45:00Z",
      }
    ]
  };
  