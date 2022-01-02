import './App.css';
import React, { Component } from 'react';
import { format } from 'date-fns'
// import * as AWS from 'aws-sdk'
// import { ConfigurationOptions } from 'aws-sdk'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      resumeData: null
    };

    // const awsConfiguration = {
    //   region:'us-east-2',
    //   secretAccessKey: '7Zn9Z/qlj7olR5E5//LU/vpYfgHvoLBFV5kO/T70',
    //   accessKeyId: 'AKIA332UJJCOVQY3TBGD'
    // }
  
    // AWS.config.update(awsConfiguration);

    this.SkillTemplate = this.SkillTemplate.bind(this);
    this.SkillsTemplate = this.SkillsTemplate.bind(this);
  }

  SkillTemplate = function(props) {
    // if(!props.skills){
    //   return null;
    // }
    return props.skills.map(skill => <li key={skill}>{skill}</li>);
  };

  SkillsTemplate = function(props) {
    if(!props.skills){
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
  
  EducationTemplate = function(props) {
    if(!props.education){
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
  
  JobsTemplate = function(props) {
    if(!props.jobs){
      return null;
    }
    
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

  GetResumeData = function(){
    // const docClient = new AWS.DynamoDB.DocumentClient();
    // var params = {
    //   TableName: "resume"
    // };
    //let self = this;
    // docClient.scan(params, function (err, data) {
    //   if (!err) {
    //     self.setState({resumeData: data.Items[0]});
    //   }
    // });
    this.setState({resumeData: require('./resume.json')});
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

  componentDidMount(){
    this.GetResumeData();
  }
}

export default App;
