import './App.css';
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { format } from 'date-fns'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resumeData: null
    };

    this.SkillTemplate = this.SkillTemplate.bind(this);
    this.SkillsTemplate = this.SkillsTemplate.bind(this);
  }

  SkillTemplate = function (props) {
    // if(!props.skills){
    //   return null;
    // }
    return props.skills.map(skill => <li key={skill}>{skill}</li>);
  };

  SkillsTemplate = function (props) {
    if (!props.skills) {
      return null;
    }
    var skillKeys = Object.keys(props.skills);
    var self = this;
    var skillTemplate = skillKeys.map(skillKey => <div className="skills" key={skillKey + "Div"}><span className="skill" key={skillKey + "Span"}>{skillKey}</span>
      <ul key={skillKey + "Ul"}>
        <self.SkillTemplate key={skillKey + "Skill"} skills={props.skills[skillKey]} />
      </ul></div>)
    return <div className="allSkills">{skillTemplate}</div>;

  };

  EducationTemplate = function (props) {
    if (!props.education) {
      return null;
    }

    var educationTemplate = props.education
      .sort((a, b) => a.start < b.start ? 1 : -1)
      .map((edu, idx) => <div key={"edu" + idx} className={"summary education"}>
        <span className="name">{edu.name}</span>
        <span className="right">
          <span className="location">({edu.location})</span>
          <span className="dates">[{edu.start} - {edu.end}]</span>
        </span>
        <div className="title-terms">
          <span className="field">{edu.field}</span>
        </div>
      </div>);

    return <div className={"history allEducation"}>{educationTemplate}</div>;
  };


  JobsTemplate = function (props) {
    if (!props.jobs) {
      return null;
    }

    var lastBreak = -100;
    var applyPageBreak = function (target) {
      const pageThreshold = 843;

      if (target.children.length > 0) {
        for (let childIdx = 0; childIdx < target.children.length; childIdx++) {
          const childElement = target.children[childIdx];

          applyPageBreak(childElement);
        }
      }
      else {
        var workingTop = target.offsetTop;
        target.setAttribute("telemetry", JSON.stringify({ workingTop }));
        //target.innerHTML +=  JSON.stringify({ workingTop });
        if (workingTop - lastBreak >= pageThreshold) {
          lastBreak = workingTop;
          
          target.classList.add('pg-break');
        }
      }
    };

    var jobsTemplate = props.jobs
      .sort((a, b) => Date.parse(a.start) < Date.parse(b.start) ? 1 : -1)
      .map((job, idx) => <div id={"job" + idx} key={"job" + idx} className={"summary job"}>
        <span className="name">{job.clientName}</span>
        <span className="right">
          <span className="location">{job.location}</span>
          <span className="dates">[{format(Date.parse(job.start), "M/yyyy")} - {job.end != null ? format(Date.parse(job.end), "M/yyyy") : "present"}]</span>
        </span>
        <div className="title-terms">
          <span className="title">{job.title.trim()} - {job.terms}</span>
        </div>
        <div className="details"
          ref={el => {
            // el can be null - see https://reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs
            if (!el) return;

            applyPageBreak(el);
          }}
          dangerouslySetInnerHTML={{ __html: job.details.join("") }} />

      </div>)

    return <div className={"history allJobs"}>{jobsTemplate}</div>;
  }

  GetResumeData = function () {
    this.setState({ resumeData: require('./resume.json') });
  };

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 style={{ marginBottom: 0 }}>Alex Jamrozek</h1>
          <h3 style={{ margin: 0 }}>{this.state.resumeData?.title}</h3>
          <p >{this.state.resumeData?.tagLine} </p>
          <this.SkillsTemplate skills={this.state.resumeData?.skills} />
          <this.EducationTemplate education={this.state.resumeData?.education} />
        </header>
        <this.JobsTemplate jobs={this.state.resumeData?.jobs} />
      </div>);
  }

  componentDidMount() {
    this.GetResumeData();

  }
}

export default App;
