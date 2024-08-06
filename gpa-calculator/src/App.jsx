import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import DataTable from '/Users/gunter/Documents/WebCode/ThawHtutSoe.github.io/gpa-calculator/src/components/DataTable.jsx';
import subjectsData from '/Users/gunter/Documents/WebCode/ThawHtutSoe.github.io/gpa-calculator/src/subjects.json';
import { Modal, Button } from 'react-bootstrap';

function App() {
  const [courses, setCourses] = useState([]);
  const [grade, setGrade] = useState('');
  const [credits, setCredits] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSubjects(subjectsData.subjects);
  }, []);

  const handleAddCourse = () => {
    setCourses([...courses, { subjectCode, subjectName, grade, credits: parseFloat(credits) }]);
    setSubjectCode('');
    setSubjectName('');
    setGrade('');
    setCredits('');
  };

  const handleDeleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSort = (direction) => {
    const sortedCourses = [...courses].sort((a, b) => {
      if (direction === 'asc') {
        return a.grade > b.grade ? 1 : -1;
      } else {
        return a.grade < b.grade ? 1 : -1;
      }
    });
    setCourses(sortedCourses);
  };

  const calculateGPA = () => {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = courses.reduce((sum, course) => {
      let gradePoint = 0;
      switch (course.grade.toUpperCase()) {
        case 'A':
          gradePoint = 4.0;
          break;
        case 'B':
          gradePoint = 3.0;
          break;
        case 'C':
          gradePoint = 2.0;
          break;
        case 'D':
          gradePoint = 1.0;
          break;
        case 'F':
          gradePoint = 0.0;
          break;
        default:
          break;
      }
      return sum + gradePoint * course.credits;
    }, 0);
    return (totalPoints / totalCredits).toFixed(2);
  };

  const handleSubjectSelect = (code, name) => {
    setSubjectCode(code);
    setSubjectName(name);
    setShowModal(false);
  };

  return (
    <div className="App container">
      <h1>GPA Calculator</h1>
      <div className="input-section mb-4">
        <button onClick={() => setShowModal(true)} className="btn btn-primary mb-2">
          Choose Subject
        </button>
        {subjectName && <p>Chosen Subject: {subjectName}</p>}
        <input
          type="text"
          placeholder="Grade (A, B, C, D, F)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleAddCourse} className="btn btn-primary">
          Add Course
        </button>
      </div>
      <DataTable data={courses} onDelete={handleDeleteCourse} onSort={handleSort} />
      {courses.length > 0 && (
        <div className="gpa-result mt-4">
          <h2>GPA: {calculateGPA()}</h2>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {subjects.map((subject, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSubjectSelect(subject.code, subject.name)}
                style={{ cursor: 'pointer' }}
              >
                {subject.name}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
