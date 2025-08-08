// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [ ];


  
   try {
    if (ag.course_id !== course.id) {
      throw new Error("AssignmentGroup does not belong to its course (mismatching course_id), ");
    }

    const now = new Date();
    const assignments = {};
    for (let a of ag.assignments) {
      const due = new Date(a.due_at);
      const points = Number(a.points_possible);
      if (due <= now && points > 0) {
        assignments[a.id] = {
          due_at: due,
          points_possible: points
        };
      }
    }

    const learners = {};

    for (let s of submissions) {
      const a = assignments[s.assignment_id];
      if (!a) continue;

      const id = s.learner_id;
      if (!learners[id]) {
        learners[id] = {
          id: id,
          totalScore: 0,
          totalPossible: 0,
          assignments: {}
        };
      }

      let score = Number(s.submission.score);
      const submitted = new Date(s.submission.submitted_at);
      if (submitted > a.due_at) {
        score -= a.points_possible * 0.1;
      }
      if (score < 0) score = 0;

      learners[id].totalScore += score;
      learners[id].totalPossible += a.points_possible;
      learners[id].assignments[s.assignment_id] = parseFloat((score / a.points_possible).toFixed(3));
    }

    for (let id in learners) {
      const l = learners[id];
      const obj = { id: l.id, avg: parseFloat((l.totalScore / l.totalPossible).toFixed(3)) };
      for (let aid in l.assignments) {
        obj[aid] = l.assignments[aid];
      }
      result.push(obj);
    }

  } catch (e) {
    console.error(e.message);
  }

  return result;
}



const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);



   



  




