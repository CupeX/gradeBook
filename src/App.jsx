import React from "react";
import Table from "./Table";
import List from "./List";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonClicked: "",
      assignments: [],
      students: [],
      grades: {},
    };

    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addGrade = this.addGrade.bind(this);

    // added remove
    this.removeAssignment = this.removeAssignment.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }

  handleButtonClicked(buttonName) {
    this.setState({
      buttonClicked: buttonName,
    });
  }

  addAssignment(assignmentName) {
    // added check for existing assignment or empty input
    if (
      !assignmentName ||
      this.state.assignments.findIndex(
        (assignment) => assignment === assignmentName
      ) !== -1
    ) {
      return;
    }
    this.setState({
      assignments: this.state.assignments.concat(assignmentName),
    });
  }

  addStudent(studentName) {
    // added check for existing student or empty input
    if (
      !studentName ||
      this.state.students.findIndex((student) => student === studentName) !== -1
    ) {
      return;
    }
    this.setState({
      students: this.state.students.concat(studentName),
    });
  }

  addGrade(assignment, student, score) {
    let grades = this.state.grades;
    let assignmentName = assignment;
    let studentName = student;
    if (!(assignment in grades)) {
      grades[assignmentName] = {};
    }
    grades[assignmentName][studentName] = score;
    this.setState({ grades: grades });
  }

  removeAssignment(index) {
    const newList = this.state.assignments.filter(
      (_, listIndex) => index !== listIndex
    );
    this.setState({ assignments: newList });
  }

  removeStudent(index) {
    const newList = this.state.students.filter(
      (_, listIndex) => index !== listIndex
    );
    this.setState({ students: newList });
  }

  render() {
    let tabChoice = <div />;

    if (this.state.buttonClicked === "assignments") {
      tabChoice = (
        <List
          placeholder="Add Assignment..."
          currList={this.state.assignments}
          addFunction={this.addAssignment}
          removeFunction={this.removeAssignment}
          title="Assignments"
        />
      );
    }

    if (this.state.buttonClicked === "students") {
      tabChoice = (
        <List
          placeholder="Add Student..."
          currList={this.state.students}
          addFunction={this.addStudent}
          removeFunction={this.removeStudent}
          title="Student Roster"
        />
      );
    }

    if (this.state.buttonClicked === "grades") {
      tabChoice = (
        <Table
          tableNames={this.state.assignments}
          rows={this.state.students}
          addFunction={this.addGrade}
          removeAssignment={this.removeAssignment}
          removeStudent={this.removeStudent}
          data={this.state.grades}
        />
      );
    }

    return (
      <div>
        <div className="Box Box--spacious f4">
          <div className="Box-header">
            <h3 className="Box-title d-flex flex-justify-center">GradeBook</h3>
          </div>
        </div>
        <nav className="UnderlineNav d-flex flex-justify-center">
          <div className="UnderlineNav-body pt-6">
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("assignments")}
            >
              Assignments
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("students")}
            >
              Students
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("grades")}
            >
              Grades
            </button>
          </div>
        </nav>
        {tabChoice}
      </div>
    );
  }
}

export default App;
