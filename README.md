## Todo App ##
Todo app with monolith architecture
## Frontend ##
- MUI is used for design
- To run frontend
  - > npm start
  - > npm run dev

## Backend ##
- To run backend for development
  - > npm run tsc:watch
  - > docker compose up if server is not started then use docker-compose -f docker-compose.yaml up

## Commit message formate ##
**Type**:

  - ***feat***: (new feature for the user, not a new feature for build script)
  - ***add***: (changes to add new capability or functions)
  - ***cut***: (removing the capability or functions)
  - ***fix***: (bug fix for the user, not a fix to a build script)
  - ***style***: (formatting, missing semi colons, etc; no production code change)
  - ***refactor***: (refactoring production code, eg. renaming a variable)
  - ***docs***: (changes to the documentation)
  - ***test***: (adding missing tests, refactoring tests; no production code change)
  - ***chore***: (updating grunt tasks etc; no production code change)
  - ***bump***: (increasing the versions or dependency versions)
  - ***build***: (changes to build system or external dependencies)
  - ***make***: (change to the build process, or tooling, or infra)
  - ***ci***: (changes to CI configuration files and scripts)

- Follow this message formate while doing commit
  - **_type:_** Add HTTP request status tracking in core action and reducer

  **Description:**
    <ul>
      <li>
        <p>Implement functionality to track the status of HTTP requests within the core action and reducer</p>
      </li>
      <li>
        <p>Set up action types, action creators, and reducer logic to manage request statuses (in progress or completed).</p>
      </li>
      <li>
        <p>Updated state management to reflect the status of ongoing or completed HTTP requests.</p>
      </li>
      <li>
        <p>Improved the handling of asynchronous HTTP request actions using Redux.</p>
      </li>
    </ul>

  **Changes:**
    <ul>
      <li>
        <p>Added new action types: REQUEST_START, REQUEST_SUCCESS, REQUEST_FAILURE.</p>
      </li>
      <li>
        <p>Created action creators to dispatch request status updates.</p>
      </li>
      <li>
        <p>Implemented reducer logic to manage and update request status in the state.</p>
      </li>
      <li>
        <p>Enhanced state structure to incorporate request status tracking.</p>
      </li>
    </ul>

  **Impact:**
    - Provides enhanced control and monitoring of HTTP requests within the application's Redux state.
    - Allows components to react to different request statuses (e.g., show loading spinners for ongoing requests, display success or error messages).
    - Improves overall user experience by managing asynchronous operations more effectively.
  