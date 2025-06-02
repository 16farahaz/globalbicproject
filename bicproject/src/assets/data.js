
  export const formations = [
  {
    //
    id: "1",
    mode: "Présentiel",
    title: "Formation Technique pour les ingénieurs",
    lieu: "Bizerte , Laazib , bic office (salle de formation)",
    type: "Continue", // le type peut etre soit continu soit intégration
    time: "2024-02-07T12:00:00.000Z",
    duree: 4,
    createdAt: "2023-12-01T09:00:00.000Z",
    updatedAt: "2024-01-15T11:00:00.000Z"
  },
  {
    id: "2",
    mode: "En ligne",
    title: "Formation Soft Skills",
    lieu: "Zoom",
    type: "Integré",
    time: "2025-09-01T14:00:00Z",
    duree: 2,
    createdAt: "2025-05-20T08:30:00.000Z",
    updatedAt: "2025-06-10T10:45:00.000Z"
  },
  {
    id: "3",
    mode: "Hybride",
    title: "Formation Générale pour les managers",
    lieu: "Sfax",
    type: "Management",
    time: "2025-10-10T10:00:00Z",
    duree: 3,
    createdAt: "2025-07-15T14:20:00.000Z",
    updatedAt: "2025-08-01T09:00:00.000Z"
  },
  {
    id: "4",
    mode: "Présentiel",
    title: "Formation pour l'équipe de sécurité",
    lieu: "Nabeul",
    type: "Cybersécurité",
    time: "2025-11-05T13:30:00Z",
    duree: 5,
    createdAt: "2025-08-25T13:00:00.000Z",
    updatedAt: "2025-09-10T15:30:00.000Z"
  }
];
export const Evaluationachaud = [
  {
    id: 0,
    formationId: "1",
    formationName: "Formation mechanique pour les nouveaux employés",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "3",
    question2: "4",
    question3: "2",
    question4: "4",
    question5: "3",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T12:00:00Z"
  },
  {
    id: 1,
    formationId: "1",
    formationName: "Formation Technique pour les ingénieurs",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "3",
    question2: "4",
    question3: "2",
    question4: "4",
    question5: "3",
    createdAt: "2024-12-01T10:00:00Z",
    updatedAt: "2024-12-01T12:00:00Z"
  },
  {
    id: 2,
    formationId: "2",
    formationName: "Formation Soft Skills",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "2",
    question2: "3",
    question3: "4",
    question4: "3",
    question5: "2",
    createdAt: "2024-12-02T09:00:00Z",
    updatedAt: "2024-12-02T11:00:00Z"
  },
  {
    id: 3,
    formationId: "3",
    formationName: "Formation Générale pour les managers",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "4",
    question2: "4",
    question3: "3",
    question4: "2",
    question5: "3",
    createdAt: "2024-12-03T08:30:00Z",
    updatedAt: "2024-12-03T10:30:00Z"
  },
  {
    id: 4,
    formationId: "4",
    formationName: "Formation pour l'équipe de sécurité",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "3",
    question2: "2",
    question3: "4",
    question4: "4",
    question5: "4",
    createdAt: "2024-12-04T13:00:00Z",
    updatedAt: "2024-12-04T15:00:00Z"
  },
  {
    id: 5,
    formationId: "5",
    formationName: "Formation générale",
    Evaluator: "5c202d4aa62f32ffd1303cc",
    question1: "1",
    question2: "3",
    question3: "2",
    question4: "3",
    question5: "4",
    createdAt: "2024-12-05T14:00:00Z",
    updatedAt: "2024-12-05T16:00:00Z"
  }
];




export const TYPESTYLES = {
  "Technique": "bg-blue-100 text-blue-800",
  "Soft Skills": "bg-green-100 text-green-800",
  "Management": "bg-yellow-100 text-yellow-800",
  "Cybersécurité": "bg-red-100 text-red-800",
};

















//data for the frontend just to test the interface

export const summary = { 
  totalTasks: 10,
  last10Task: [
    {
      _id: "65c5f12ab5204a81bde866a9",
      title: "Test task",
      date: "2024-02-09T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471138863original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=55f909f2-7f05-42f3-af4f-dc7f87cdea1d",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707471144712PsZch9E1_400x400.jpg?alt=media&token=7ce62c7e-c240-4032-83c6-bb6c9cdc0d4b",
      ],
      team: [
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Task manager youtube tutorial",
          date: "2024-02-09T00:00:00.000Z",
          tag: "tutorial",
          _id: "65c5f153b5204a81bde866c8",
        },
      ],
      createdAt: "2024-02-09T09:32:26.574Z",
      updatedAt: "2024-02-09T09:36:53.339Z",
      __v: 1,
    },
    {
      _id: "65c5d547660756f6fd453a7a",
      title: "Duplicate - Duplicate - Review Code Changes",
      date: "2024-02-09T00:00:00.000Z",
      priority: "medium",
      stage: "in progress",
      assets: [],
      team: [
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
        {
          _id: "65c3176a0fd860f958baa099",
          name: "Emily Wilson",
          title: "Data Analyst",
          role: "Analyst",
          email: "emily.wilson@example.com",
        },
      ],
      isTrashed: false,
      activities: [
        {
          type: "started",
          activity: "Project started",
          date: "2024-02-09T09:16:56.623Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c5f18bb5204a81bde866d1",
        },
        {
          type: "commented",
          activity: "i like coding!!",
          date: "2024-02-09T09:16:56.623Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c5f19eb5204a81bde866dd",
        },
        {
          type: "bug",
          activity: "bug found",
          date: "2024-02-09T09:16:56.623Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c5f1abb5204a81bde866eb",
        },
      ],
      subTasks: [
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-08T00:00:00.000Z",
          tag: "Website App",
          _id: "65c3535476ed5c48f9440973",
        },
      ],
      createdAt: "2024-02-09T07:33:27.590Z",
      updatedAt: "2024-02-09T09:36:10.386Z",
      __v: 4,
    },
    {
      _id: "65c46026af6ec0118be9407a",
      title: "Website Project Proposal Review",
      date: "2024-02-07T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707410130023hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=08de4848-517f-48ca-a9b4-624744d5ddb0",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412301523image_processing20220706-26930-ktfgon.png?alt=media&token=6cd185c1-9fc3-4f52-bb0b-0d4a29e65b85",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412306237image_processing20220706-11953-1f826f4.png?alt=media&token=7270475f-a994-41fd-8ae6-62e00f72b0b3",
      ],
      team: [
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c27a0e18c0a1b750ad5cad",
          name: "John Doe",
          title: "Software Engineer",
          role: "Developer",
          email: "john.doe@example.com",
        },
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
      ],
      isTrashed: false,
      activities: [
        {
          type: "assigned",
          activity: "Test activity. Let's go!!!",
          date: "2024-02-08T17:55:34.353Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c5188be1585cfa650b79c4",
        },
        {
          type: "in progress",
          activity: "Project is progress. Hiope to fin=ish soon!!",
          date: "2024-02-08T17:55:34.353Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c518dce1585cfa650b79da",
        },
        {
          type: "bug",
          activity: "Bug found in the code. Kindly check and fixed ASAP!!!",
          date: "2024-02-08T18:13:14.717Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c51a5e8064df97d208b392",
        },
        {
          type: "commented",
          activity: "Nice work. Let's finished hard!!!",
          date: "2024-02-08T18:13:14.717Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c51af08064df97d208b3b0",
        },
      ],
      subTasks: [
        {
          title: "Blog App Dashboard",
          date: "2024-02-06T00:00:00.000Z",
          tag: "Design",
          _id: "65c352e776ed5c48f944095c",
        },
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-07T00:00:00.000Z",
          tag: "Design",
          _id: "65c3531476ed5c48f9440965",
        },
      ],
      createdAt: "2024-02-08T05:01:26.983Z",
      updatedAt: "2024-02-09T06:51:15.005Z",
      __v: 8,
    },
    {
      _id: "65c45fb6af6ec0118be94052",
      title: "Task Manager Youtube Video",
      date: "2024-02-11T00:00:00.000Z",
      priority: "medium",
      stage: "completed",
      assets: [
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412043078report.jpg?alt=media&token=41d02b42-c25c-4fbb-90a9-340a45f4bbe1",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412052287hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=98b360b4-954c-47e3-8283-8228a54a327c",
      ],
      team: [
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
        {
          _id: "65c3176a0fd860f958baa099",
          name: "Emily Wilson",
          title: "Data Analyst",
          role: "Analyst",
          email: "emily.wilson@example.com",
        },
      ],
      isTrashed: false,
      activities: [
        {
          type: "completed",
          activity: "Project completed!!",
          date: "2024-02-08T18:13:14.717Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c51b998064df97d208b3f9",
        },
      ],
      subTasks: [
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-08T00:00:00.000Z",
          tag: "Website App",
          _id: "65c3535476ed5c48f9440973",
        },
      ],
      createdAt: "2024-02-08T04:59:34.826Z",
      updatedAt: "2024-02-09T06:51:15.005Z",
      __v: 3,
    },
    {
      _id: "65c4586f0548279012f8c256",
      title: "Bug Fixing",
      date: "2024-02-07T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412457946Wed%20Dev%20Course.png?alt=media&token=028416bf-88c6-4738-9a5a-d90e6d53b202",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412466672original-380755132e03e80a9fa3ef1203219cf3.png?alt=media&token=10d96b0d-feea-4627-aa1e-9b8f87cf7500",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412469358original-a738b8d0cbced29ae8609072d006fbcb.jpg?alt=media&token=9a6cc56f-63ff-4405-b978-d962c3c1f1d0",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412472346cosial.png?alt=media&token=b6e427b3-bc36-4fa2-a8f9-438f9ebf93e2",
        "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412478590original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=e81047bd-a1e2-49e5-85f5-feda31c423f2",
      ],
      team: [
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
      ],
      isTrashed: false,
      activities: [
        {
          type: "commented",
          activity: "Great!!!",
          date: "2024-02-08T18:13:14.717Z",
          by: "65c202d4aa62f32ffd1303cc",
          _id: "65c51b678064df97d208b3d6",
        },
      ],
      subTasks: [
        {
          title: "Check Login code and fix bugs asap",
          date: "2024-02-08T00:00:00.000Z",
          tag: "Bug Fixing",
          _id: "65c46074af6ec0118be94094",
        },
      ],
      createdAt: "2024-02-08T04:28:31.966Z",
      updatedAt: "2024-02-09T06:51:15.005Z",
      __v: 3,
    },
    {
      _id: "65c3c457fb9c6768ce4bc31a",
      title: "Duplicate - Website Project Proposal",
      date: "2024-02-07T17:55:13.218Z",
      priority: "high",
      stage: "todo",
      assets: [],
      team: [
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c27a0e18c0a1b750ad5cad",
          name: "John Doe",
          title: "Software Engineer",
          role: "Developer",
          email: "john.doe@example.com",
        },
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Blog App Dashboard",
          date: "2024-02-06T00:00:00.000Z",
          tag: "Design",
          _id: "65c352e776ed5c48f944095c",
        },
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-07T00:00:00.000Z",
          tag: "Design",
          _id: "65c3531476ed5c48f9440965",
        },
      ],
      createdAt: "2024-02-07T17:56:39.969Z",
      updatedAt: "2024-02-09T06:51:15.005Z",
      __v: 1,
    },
    {
      _id: "65c3c439fb9c6768ce4bc308",
      title: "Duplicate - Review Code Changes",
      date: "2024-02-07T17:55:13.218Z",
      priority: "medium",
      stage: "in progress",
      assets: [],
      team: [
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
        {
          _id: "65c3176a0fd860f958baa099",
          name: "Emily Wilson",
          title: "Data Analyst",
          role: "Analyst",
          email: "emily.wilson@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-08T00:00:00.000Z",
          tag: "Website App",
          _id: "65c3535476ed5c48f9440973",
        },
      ],
      createdAt: "2024-02-07T17:56:09.174Z",
      updatedAt: "2024-02-07T17:56:09.456Z",
      __v: 1,
    },
    {
      _id: "65c3c21f55ae9b2f7666e86c",
      title: "Duplicate - Website Project Proposal",
      date: "2024-02-07T17:46:56.040Z",
      priority: "normal",
      stage: "todo",
      assets: [],
      team: [
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c27a0e18c0a1b750ad5cad",
          name: "John Doe",
          title: "Software Engineer",
          role: "Developer",
          email: "john.doe@example.com",
        },
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Blog App Dashboard",
          date: "2024-02-06T00:00:00.000Z",
          tag: "Design",
          _id: "65c352e776ed5c48f944095c",
        },
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-07T00:00:00.000Z",
          tag: "Design",
          _id: "65c3531476ed5c48f9440965",
        },
      ],
      createdAt: "2024-02-07T17:47:11.560Z",
      updatedAt: "2024-02-07T17:47:11.972Z",
      __v: 1,
    },
    {
      _id: "65c352b376ed5c48f9440955",
      title: "Review Code Changes",
      date: "2024-02-05T00:00:00.000Z",
      priority: "medium",
      stage: "in progress",
      assets: [],
      team: [
        {
          _id: "65c317360fd860f958baa08e",
          name: "Alex Johnson",
          title: "UX Designer",
          role: "Designer",
          email: "alex.johnson@example.com",
        },
        {
          _id: "65c3176a0fd860f958baa099",
          name: "Emily Wilson",
          title: "Data Analyst",
          role: "Analyst",
          email: "emily.wilson@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-08T00:00:00.000Z",
          tag: "Website App",
          _id: "65c3535476ed5c48f9440973",
        },
      ],
      createdAt: "2024-02-07T09:51:47.149Z",
      updatedAt: "2024-02-07T09:54:28.645Z",
      __v: 1,
    },
    {
      _id: "65c351b976ed5c48f9440947",
      title: "Website Project Proposal",
      date: "2024-02-07T00:00:00.000Z",
      priority: "high",
      stage: "todo",
      assets: [],
      team: [
        {
          _id: "65c202d4aa62f32ffd1303cc",
          name: "Farah Azizi",
          title: "Administrator",
          role: "Admin",
          email: "admin@gmail.com",
        },
        {
          _id: "65c27a0e18c0a1b750ad5cad",
          name: "John Doe",
          title: "Software Engineer",
          role: "Developer",
          email: "john.doe@example.com",
        },
        {
          _id: "65c30b96e639681a13def0b5",
          name: "Jane Smith",
          title: "Product Manager",
          role: "Manager",
          email: "jane.smith@example.com",
        },
      ],
      isTrashed: false,
      activities: [],
      subTasks: [
        {
          title: "Blog App Dashboard",
          date: "2024-02-06T00:00:00.000Z",
          tag: "Design",
          _id: "65c352e776ed5c48f944095c",
        },
        {
          title: "Blog App Admin Dashboard",
          date: "2024-02-07T00:00:00.000Z",
          tag: "Design",
          _id: "65c3531476ed5c48f9440965",
        },
      ],
      createdAt: "2024-02-07T09:47:37.337Z",
      updatedAt: "2024-02-07T09:53:24.079Z",
      __v: 2,
    },
  ],
  users: [
    {
      _id: "65c5f27fb5204a81bde86833",
      name: "Amani Wattas ",
      title: "Designer",
      role: " Team Leader",
      isActive: true,
      createdAt: "2024-02-09T09:38:07.765Z",
    },
    {
      _id: "65c3176a0fd860f958baa099",
      name: "Emily Wilson",
      title: "Data Analyst",
      role: "Analyst",
      isActive: true,
      createdAt: "2024-02-07T05:38:50.816Z",
    },
    {
      _id: "65c317360fd860f958baa08e",
      name: "Alex Johnson",
      title: "UX Designer",
      role: "Designer",
      isActive: true,
      createdAt: "2024-02-07T05:37:58.862Z",
    },
    {
      _id: "65c30b96e639681a13def0b5",
      name: "Jane Smith",
      title: "Product Manager",
      role: "Manager",
      isActive: true,
      createdAt: "2024-02-07T04:48:22.519Z",
    },
    {
      _id: "65c202d4aa62f32ffd1303cc",
      name: "Farah Azizi",
      title: "Administrator",
      role: "Admin",
      createdAt: "2015-02-06T09:58:44.794Z",
      isActive: true,
    },
    {
      _id: "65d789450fd860f958baa0ff",
      name: "Youssef Al Aloui",
      title: "Software Engineer",
      email: "youssef.alaloui@example.com",
      role: "Developer",
      isActive: true,
      createdAt: "2024-02-07T04:48:22.519Z",
    },
    {
      _id: "65d789670fd860f958baa100",
      name: "Fatima Zahra Ben Said",
      title: "Project Manager",
      email: "fatima.bensaid@example.com",
      role: "Tester",
      isActive: true,
      createdAt: "2025-02-07T04:48:22.519Z",
    },
    {
      _id: "65d789890fd860f958baa101",
      name: "Ali Kettani",
      title: "UX Designer",
      email: "ali.kettani@example.com",
      role: "Developer",
      isActive: false,
      createdAt: "2024-02-07T04:48:22.519Z",
    }
  ],
  tasks: {
    todo: 6,
    "in progress": 3,
    completed: 1,
  },
};

export const chartData = [
  {
    name: "High",
    total: 2400,
  },
  {
    name: "Medium",
    total: 2210,
  },
  {
    name: "Normal",
    total: 3210,
  },
  {
    name: "Low",
    total: 2290,
  },
];

export const tasks = [
  {
    _id: "65c5f12ab5204a81bde866a9",
    title: "Test task",
    date: "2024-02-09T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    team: [
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
        {
          _id: "65d789450fd860f958baa0ff",
          name: "Youssef Al Aloui",
          title: "Software Engineer",
          email: "youssef.alaloui@example.com",
        },
        {
          _id: "65d789670fd860f958baa100",
          name: "Fatima Zahra Ben Said",
          title: "Project Manager",
          email: "fatima.bensaid@example.com",
        },
        {
          _id: "65d789890fd860f958baa101",
          name: "Ali Kettani",
          title: "UX Designer",
          email: "ali.kettani@example.com",
        }
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Task manager youtube tutorial",
        date: "2024-02-09T00:00:00.000Z",
        tag: "tutorial",
        _id: "65c5f153b5204a81bde866c8",
      },
    ],
    createdAt: "2025-02-09T09:32:26.574Z",
    updatedAt: "2025-02-09T09:36:53.339Z",
    __v: 1,
  },
  {
    _id: "65c5d547660756f6fd453a7a",
    title: "Duplicate - Duplicate - Review Code Changes",
    date: "2024-02-09T00:00:00.000Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
      {
        _id: "65c3176a0fd860f958baa099",
        name: "Emily Wilson",
        title: "Data Analyst",
        email: "emily.wilson@example.com",
      },
    ],
    isTrashed: false,
    activities: [
      {
        type: "started",
        activity: "Project started",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f18bb5204a81bde866d1",
      },
      {
        type: "commented",
        activity: "i like coding!!",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f19eb5204a81bde866dd",
      },
      {
        type: "bug",
        activity: "bug found",
        date: "2024-02-09T09:16:56.623Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5f1abb5204a81bde866eb",
      },
    ],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2025-02-09T07:33:27.590Z",
    updatedAt: "2025-02-09T09:36:10.386Z",
    __v: 4,
  },
  {
    _id: "65c46026af6ec0118be9407a",
    title: "Website Project Proposal Review",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707410130023hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=08de4848-517f-48ca-a9b4-624744d5ddb0",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412301523image_processing20220706-26930-ktfgon.png?alt=media&token=6cd185c1-9fc3-4f52-bb0b-0d4a29e65b85",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412306237image_processing20220706-11953-1f826f4.png?alt=media&token=7270475f-a994-41fd-8ae6-62e00f72b0b3",
    ],
    team: [
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c27a0e18c0a1b750ad5cad",
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
      },
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
    ],
    isTrashed: false,
    activities: [
      {
        type: "assigned",
        activity: "Test activity. Let's go!!!",
        date: "2024-02-08T17:55:34.353Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c5188be1585cfa650b79c4",
      },
      {
        type: "in progress",
        activity: "Project is progress. Hope to finish soon!!",
        date: "2024-02-08T17:55:34.353Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c518dce1585cfa650b79da",
      },
      {
        type: "bug",
        activity: "Bug found in the code. Kindly check and fixed ASAP!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51a5e8064df97d208b392",
      },
      {
        type: "commented",
        activity: "Nice work. Let's finished hard!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51af08064df97d208b3b0",
      },
    ],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-08T05:01:26.983Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 8,
  },
  {
    _id: "65c45fb6af6ec0118be94052",
    title: "Task Manager Youtube Video",
    date: "2024-02-11T00:00:00.000Z",
    priority: "medium",
    stage: "completed",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412043078report.jpg?alt=media&token=41d02b42-c25c-4fbb-90a9-340a45f4bbe1",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412052287hand-holding-writing-checklist-application-form-document-clipboard-white-background-3d-illustration.jpg?alt=media&token=98b360b4-954c-47e3-8283-8228a54a327c",
    ],
    team: [
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
      {
        _id: "65c3176a0fd860f958baa099",
        name: "Emily Wilson",
        title: "Data Analyst",
        email: "emily.wilson@example.com",
      },
    ],
    isTrashed: false,
    activities: [
      {
        type: "started",
        activity: "Project started",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Farah Azizi" },
        _id: "65c51b998064dfd208b3f9",
      },
      {
        type: "commented",
        activity: "Project completed successfully",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Farah Azizi" },
        _id: "65c51b98064df97d208b3f9",
      },
      {
        type: "bug",
        activity: " bug fixing completed successfully",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Farah Azizi" },
        _id: "65c51b998064df97d208b3f9",
      },
      {
        type: "completed",
        activity: "Project completed successfully",
        date: "2024-02-08T18:13:14.717Z",
        by: { _id: "65c202d4aa62f32ffd1303cc", name: "Farah Azizi" },
        _id: "65c51b998064df97d208b3f9",
      },
      
    ],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-08T04:59:34.826Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 3,
  },
  {
    _id: "65c4586f0548279012f8c256",
    title: "Bug Fixing",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412457946Wed%20Dev%20Course.png?alt=media&token=028416bf-88c6-4738-9a5a-d90e6d53b202",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412466672original-380755132e03e80a9fa3ef1203219cf3.png?alt=media&token=10d96b0d-feea-4627-aa1e-9b8f87cf7500",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412469358original-a738b8d0cbced29ae8609072d006fbcb.jpg?alt=media&token=9a6cc56f-63ff-4405-b978-d962c3c1f1d0",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412472346cosial.png?alt=media&token=b6e427b3-bc36-4fa2-a8f9-438f9ebf93e2",
      "https://firebasestorage.googleapis.com/v0/b/taskmanager-557d7.appspot.com/o/1707412478590original-a005132062ca5bafc505c4c74f0e1865.jpg?alt=media&token=e81047bd-a1e2-49e5-85f5-feda31c423f2",
    ],
    team: [
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
    ],
    isTrashed: false,
    activities: [
      {
        type: "Commented",
        activity: "Great!!!",
        date: "2024-02-08T18:13:14.717Z",
        by: "65c202d4aa62f32ffd1303cc",
        _id: "65c51b678064df97d208b3d6",
      },
    ],
    subTasks: [
      {
        title: "Check Login code and fix bugs asap",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Bug Fixing",
        _id: "65c46074af6ec0118be94094",
      },
    ],
    createdAt: "2024-02-08T04:28:31.966Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 3,
  },
  {
    _id: "65c3c457fb9c6768ce4bc31a",
    title: "Duplicate - Website Project Proposal",
    date: "2024-02-07T17:55:13.218Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c27a0e18c0a1b750ad5cad",
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
      },
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T17:56:39.969Z",
    updatedAt: "2024-02-09T06:51:15.005Z",
    __v: 1,
  },
  {
    _id: "65c3c439fb9c6768ce4bc308",
    title: "Duplicate - Review Code Changes",
    date: "2024-02-07T17:55:13.218Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
      {
        _id: "65c3176a0fd860f958baa099",
        name: "Emily Wilson",
        title: "Data Analyst",
        email: "emily.wilson@example.com",
      },
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-07T17:56:09.174Z",
    updatedAt: "2024-02-07T17:56:09.456Z",
    __v: 1,
  },
  {
    _id: "65c3c21f55ae9b2f7666e86c",
    title: "Duplicate - Website Project Proposal",
    date: "2024-02-07T17:46:56.040Z",
    priority: "normal",
    stage: "todo",
    assets: [],
    team: [
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c27a0e18c0a1b750ad5cad",
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
      },
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T17:47:11.560Z",
    updatedAt: "2024-02-07T17:47:11.972Z",
    __v: 1,
  },
  {
    _id: "65c352b376ed5c48f9440955",
    title: "Review Code Changes",
    date: "2024-02-05T00:00:00.000Z",
    priority: "medium",
    stage: "in progress",
    assets: [],
    team: [
      {
        _id: "65c317360fd860f958baa08e",
        name: "Alex Johnson",
        title: "UX Designer",
        email: "alex.johnson@example.com",
      },
      {
        _id: "65c3176a0fd860f958baa099",
        name: "Emily Wilson",
        title: "Data Analyst",
        email: "emily.wilson@example.com",
      },
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-08T00:00:00.000Z",
        tag: "Website App",
        _id: "65c3535476ed5c48f9440973",
      },
    ],
    createdAt: "2024-02-07T09:51:47.149Z",
    updatedAt: "2024-02-07T09:54:28.645Z",
    __v: 1,
  },
  {
    _id: "65c351b976ed5c48f9440947",
    title: "Website Project Proposal",
    date: "2024-02-07T00:00:00.000Z",
    priority: "high",
    stage: "todo",
    assets: [],
    team: [
      {
        _id: "65c202d4aa62f32ffd1303cc",
        name: "Farah Azizi",
        title: "Administrator",
        email: "admin@gmail.com",
      },
      {
        _id: "65c27a0e18c0a1b750ad5cad",
        name: "John Doe",
        title: "Software Engineer",
        email: "john.doe@example.com",
      },
      {
        _id: "65c30b96e639681a13def0b5",
        name: "Jane Smith",
        title: "Product Manager",
        email: "jane.smith@example.com",
      },
    ],
    isTrashed: false,
    activities: [],
    subTasks: [
      {
        title: "Blog App Dashboard",
        date: "2024-02-06T00:00:00.000Z",
        tag: "Design",
        _id: "65c352e776ed5c48f944095c",
      },
      {
        title: "Blog App Admin Dashboard",
        date: "2024-02-07T00:00:00.000Z",
        tag: "Design",
        _id: "65c3531476ed5c48f9440965",
      },
    ],
    createdAt: "2024-02-07T09:47:37.337Z",
    updatedAt: "2024-02-07T09:53:24.079Z",
    __v: 2,
  },
];

export const user = {
  _id: "662f32ffd1303cc",
  name: "FarahAzizi",
  title: "Administrator",
  role: "Admin",
  email: "admin@mts.com",
  isAdmin: true,
  tasks: [],
  createdAt: "2024-02-06T09:58:44.794Z",
  updatedAt: "2024-02-07T06:13:26.757Z",
  __v: 0,
  isActive: true,
};

export const activitiesData = [
  {
    _id: "0",
    type: "started",
    activity: "started this task.",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "1",
    type: "commented",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam.",
    date: new Date("2023-01-15").toISOString(),
    by: "Eduardo Benz",
  },
  {
    _id: "2",
    type: "assigned",
    activity: "task to Farah Azizi",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },

  {
    _id: "3",
    type: "in progress",
    activity:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum.",
    date: new Date("2024-01-15").toISOString(),
    by: "Jason Meyers",
  },
  {
    _id: "5",
    type: "bug",
    activity: "bug to Farah Azizi",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
  {
    _id: "4",
    type: "completed",
    activity: "Farah Azizi has completed the task assigned",
    date: new Date("2023-01-15").toISOString(),
    by: "Akwasi Asante",
  },
];
