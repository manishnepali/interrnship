
import express, { response, text } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express()
const port = 3080
app.use(cors());

const test = "http://{JIRA_BASE_URL}/rest/tempo-timesheets/4/timesheet-approval/pending http://{JIRA_BASE_URL}/rest/tempo-timesheets/4/worklogs/{worklogId}"
//feych users from abano 
  await fetch('https://abano-playground.atlassian.net/rest/api/3/users/search', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'manish.nepali@abano.be:ipg6cqECKxuN31e8MLl8F131'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/api1', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));


// fetch worklog api from tempo-timesheets
  await fetch('https://api.tempo.io/core/3/worklogs', {
  method: 'GET',
  headers: {
    'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS",
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/api', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));

//fetch all projeects from abano
  await fetch('https://abano-playground.atlassian.net/rest/api/3/project', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'manish.nepali@abano.be:ipg6cqECKxuN31e8MLl8F131'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/api2', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


await fetch('https://api.tempo.io/core/3/teams', {
  method: 'GET',
  headers: {
    'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS",
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/team', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));

 
  
await fetch(`https://api.tempo.io/core/3/timesheet-approvals/team/2?from=2021-01-01&to=2021-02-28`, {
  method: 'GET',
  headers: {
    'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS",
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/approved', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));

  await fetch('https://api.tempo.io/core/3/teams/2/members', {
  method: 'GET',
  headers: {
    'Authorization': "Bearer s0sHctOaYXAtK2bmSI4tVj9NrtOxiS",
    'Accept': 'application/json'
  }
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    )
    return response.json();
  })
  .then(text => app.get('/test', (req, res) => {
    res.send(text)
  }))
  .catch(err => console.error(err));

 