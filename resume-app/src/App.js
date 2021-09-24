import './App.css';
import { format } from 'date-fns'

function SkillTemplate(props) {
  return props.skills.map(skill => <li key={skill}>{skill}</li>);
}
function SkillsTemplate(props) {
  var skillKeys = Object.keys(props.skills);
  var skillTemplate = skillKeys.map(skillKey => <div className="skills" key={skillKey + "Div"}><span className="skill" key={skillKey + "Span"}>{skillKey}</span>
    <ul key={skillKey + "Ul"}>
      <SkillTemplate key={skillKey + "Skill"} skills={props.skills[skillKey]} />
    </ul></div>)
  return <div className="allSkills">{skillTemplate}</div>;

}

function EducationTemplate(props) {
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
}

function JobsTemplate(props) {
  var jobsTemplate = props.jobs
    .sort((a, b) => Date.parse(a.start) < Date.parse(b.start) ? 1 : -1)
    .map((job, idx) => <div key={"job" + idx} className={"summary job"}>
      <span className="name">{job.clientName}</span>
      <span className="right">
        <span className="location">{job.location}</span>
        <span className="dates">[{format(Date.parse(job.start), "M/yyyy")} - {job.end != null ? format(Date.parse(job.end), "M/yyyy") : "present"}]</span>
      </span>
      <div className="title-terms">
        <span className="title">{job.title.trim()} - {job.terms}</span>
      </div>
      <div className="details" dangerouslySetInnerHTML={{ __html: job.details.join("") }} />

    </div>)

  return <div className={"history allJobs"}>{jobsTemplate}</div>;
}


function App() {
  var resumeData = require('./resume.json');

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ marginBottom: 0 }}>Alex Jamrozek</h1>
        <h3 style={{ margin: 0 }}>{resumeData.title}</h3>
        <p >{resumeData.tagLine} </p>
        <SkillsTemplate skills={resumeData.skills} />
        <EducationTemplate education={resumeData.education} />
      </header>
      <JobsTemplate jobs={resumeData.jobs} />
    </div>
  );
}

export default App;
