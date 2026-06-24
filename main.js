/*
  Peak Mind Quiz main script
  This script handles application state, UI rendering, and user interactions
  according to the MVP specification. It uses only vanilla JavaScript and
  Chart.js (loaded via CDN) for the improvement chart.
*/

(() => {
  // ----- Data Definitions -----

  // Sample question bank. For demonstration purposes, only a handful of
  // questions per topic/difficulty are included. The structure matches
  // the specification but does not yet contain the full 300-question set.
  const questionBank = {
    "Causes and Background": {
      Easy: [
        {
          id: "causes_easy_001",
          topic: "Causes and Background",
          difficulty: "Easy",
          questionText: "Which English king's weakness is often cited as a cause of the Wars of the Roses?",
          options: [
            { id: "A", text: "Edward III" },
            { id: "B", text: "Henry V" },
            { id: "C", text: "Henry VI" },
            { id: "D", text: "Edward IV" }
          ],
          correctOptionId: "C",
          explanation: "Henry VI's weak kingship and inability to control powerful nobles contributed to the outbreak of conflict.",
          syllabusArea: "Wars of the Roses - Causes and Background",
          sourceNote: "General A-level Wars of the Roses content"
        },
        {
          id: "causes_easy_002",
          topic: "Causes and Background",
          difficulty: "Easy",
          questionText: "The rivalry between which two families fueled the Wars of the Roses?",
          options: [
            { id: "A", text: "Lancaster and York" },
            { id: "B", text: "Tudor and Stuart" },
            { id: "C", text: "Norman and Saxon" },
            { id: "D", text: "Boleyn and Howard" }
          ],
          correctOptionId: "A",
          explanation: "The dynastic struggle between the houses of Lancaster and York led to the Wars of the Roses.",
          syllabusArea: "Wars of the Roses - Causes and Background",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Medium: [
        {
          id: "causes_med_001",
          topic: "Causes and Background",
          difficulty: "Medium",
          questionText: "Why was noble factionalism a significant cause of the Wars of the Roses?",
          options: [
            { id: "A", text: "It weakened the royal army" },
            { id: "B", text: "It created competing groups vying for influence at court" },
            { id: "C", text: "It reduced trade with France" },
            { id: "D", text: "It increased taxes on peasants" }
          ],
          correctOptionId: "B",
          explanation: "Powerful nobles formed rival alliances and vied for control of the king and government, destabilising the realm.",
          syllabusArea: "Wars of the Roses - Causes and Background",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Hard: [
        {
          id: "causes_hard_001",
          topic: "Causes and Background",
          difficulty: "Hard",
          questionText: "To what extent did financial instability contribute to the outbreak of the Wars of the Roses?",
          options: [
            { id: "A", text: "It was the primary cause, as it bankrupted the monarchy" },
            { id: "B", text: "It was one of several causes, undermining the king's ability to reward loyalty" },
            { id: "C", text: "It was insignificant compared to the role of foreign wars" },
            { id: "D", text: "It had no impact on the conflict's origins" }
          ],
          correctOptionId: "B",
          explanation: "Chronic financial problems limited the king's ability to patronise nobles, leading to discontent and competition for resources.",
          syllabusArea: "Wars of the Roses - Causes and Background",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ]
    },
    "Key Figures": {
      Easy: [
        {
          id: "figures_easy_001",
          topic: "Key Figures",
          difficulty: "Easy",
          questionText: "Who became King of England after Henry VI was deposed in 1461?",
          options: [
            { id: "A", text: "Richard III" },
            { id: "B", text: "Edward IV" },
            { id: "C", text: "Henry VII" },
            { id: "D", text: "George, Duke of Clarence" }
          ],
          correctOptionId: "B",
          explanation: "Edward IV, the son of Richard, Duke of York, took the throne in 1461 after Lancastrian defeats.",
          syllabusArea: "Wars of the Roses - Key Figures",
          sourceNote: "General A-level Wars of the Roses content"
        },
        {
          id: "figures_easy_002",
          topic: "Key Figures",
          difficulty: "Easy",
          questionText: "Which queen consort was a fierce supporter of the Lancastrian cause?",
          options: [
            { id: "A", text: "Elizabeth Woodville" },
            { id: "B", text: "Margaret of Anjou" },
            { id: "C", text: "Anne Neville" },
            { id: "D", text: "Catherine of Aragon" }
          ],
          correctOptionId: "B",
          explanation: "Margaret of Anjou, wife of Henry VI, was a key Lancastrian leader and organiser of resistance.",
          syllabusArea: "Wars of the Roses - Key Figures",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Medium: [
        {
          id: "figures_med_001",
          topic: "Key Figures",
          difficulty: "Medium",
          questionText: "Why was Warwick the Kingmaker's support crucial to Edward IV's early reign?",
          options: [
            { id: "A", text: "Warwick controlled Parliament" },
            { id: "B", text: "Warwick's wealth and military backing secured the throne for Edward" },
            { id: "C", text: "Warwick was heir to the throne" },
            { id: "D", text: "Warwick commanded the royal navy" }
          ],
          correctOptionId: "B",
          explanation: "Warwick provided substantial financial and military support that enabled Edward IV to maintain his position against rivals.",
          syllabusArea: "Wars of the Roses - Key Figures",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Hard: [
        {
          id: "figures_hard_001",
          topic: "Key Figures",
          difficulty: "Hard",
          questionText: "Which interpretation best explains Richard III's seizure of power: personal ambition, legal claim, or fear of rival factions?",
          options: [
            { id: "A", text: "Personal ambition drove Richard to take the throne" },
            { id: "B", text: "A strong legal claim justified Richard's coronation" },
            { id: "C", text: "Fear of rival factions threatened his safety" },
            { id: "D", text: "A combination of factors including ambition and fear" }
          ],
          correctOptionId: "D",
          explanation: "Historians debate the causes of Richard's usurpation; many argue a mix of personal ambition and concerns about rival factions best explains his actions.",
          syllabusArea: "Wars of the Roses - Key Figures",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ]
    },
    "Key Battles and Events": {
      Easy: [
        {
          id: "battles_easy_001",
          topic: "Key Battles and Events",
          difficulty: "Easy",
          questionText: "Where was the decisive battle in 1461 that brought Edward IV to the throne?",
          options: [
            { id: "A", text: "Bosworth" },
            { id: "B", text: "Towton" },
            { id: "C", text: "Barnet" },
            { id: "D", text: "St Albans" }
          ],
          correctOptionId: "B",
          explanation: "The Battle of Towton was the largest and bloodiest battle of the Wars of the Roses and secured Edward IV's kingship.",
          syllabusArea: "Wars of the Roses - Battles",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Medium: [
        {
          id: "battles_med_001",
          topic: "Key Battles and Events",
          difficulty: "Medium",
          questionText: "How did the Readeption of Henry VI in 1470–1471 influence the conflict?",
          options: [
            { id: "A", text: "It permanently restored Lancastrian control" },
            { id: "B", text: "It split Yorkist support and allowed Edward IV to regroup" },
            { id: "C", text: "It ended fighting for five years" },
            { id: "D", text: "It led to peace negotiations with France" }
          ],
          correctOptionId: "B",
          explanation: "The brief restoration of Henry VI exposed divisions among Yorkists, enabling Edward IV to regain support and ultimately restore himself.",
          syllabusArea: "Wars of the Roses - Battles",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Hard: [
        {
          id: "battles_hard_001",
          topic: "Key Battles and Events",
          difficulty: "Hard",
          questionText: "Which factor best explains the Yorkist victory at the Battle of Towton: numerical superiority, weather conditions, or Lancastrian leadership?",
          options: [
            { id: "A", text: "Numerical superiority" },
            { id: "B", text: "Favourable weather conditions" },
            { id: "C", text: "Poor Lancastrian leadership" },
            { id: "D", text: "A combination of several factors" }
          ],
          correctOptionId: "D",
          explanation: "Historians point to a mixture of Yorkist numbers, tactical use of weather and Lancastrian mismanagement as contributing to the outcome.",
          syllabusArea: "Wars of the Roses - Battles",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ]
    },
    "Yorkist Rule and Political Power": {
      Easy: [
        {
          id: "york_easy_001",
          topic: "Yorkist Rule and Political Power",
          difficulty: "Easy",
          questionText: "Which Yorkist king's reign began in 1461?",
          options: [
            { id: "A", text: "Edward IV" },
            { id: "B", text: "Richard III" },
            { id: "C", text: "Henry VII" },
            { id: "D", text: "Henry VI" }
          ],
          correctOptionId: "A",
          explanation: "Edward IV's first reign began in 1461 following victories over the Lancastrians.",
          syllabusArea: "Wars of the Roses - Yorkist Rule",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Medium: [
        {
          id: "york_med_001",
          topic: "Yorkist Rule and Political Power",
          difficulty: "Medium",
          questionText: "Why did George, Duke of Clarence, rebel against his brother Edward IV?",
          options: [
            { id: "A", text: "He wanted the throne for himself" },
            { id: "B", text: "He opposed Edward's marriage to Elizabeth Woodville" },
            { id: "C", text: "He was forced by Warwick" },
            { id: "D", text: "He sought foreign alliances" }
          ],
          correctOptionId: "B",
          explanation: "Clarence joined Warwick's rebellion partly due to resentment toward Edward IV's marriage to the Woodville family, which weakened Clarence's influence.",
          syllabusArea: "Wars of the Roses - Yorkist Rule",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Hard: [
        {
          id: "york_hard_001",
          topic: "Yorkist Rule and Political Power",
          difficulty: "Hard",
          questionText: "Which factor most limited Edward IV's ability to consolidate royal authority: noble rivalry, foreign policy, or financial mismanagement?",
          options: [
            { id: "A", text: "Noble rivalry" },
            { id: "B", text: "Foreign policy" },
            { id: "C", text: "Financial mismanagement" },
            { id: "D", text: "The church's opposition" }
          ],
          correctOptionId: "A",
          explanation: "Ongoing rivalries among powerful nobles constrained Edward's authority and required careful patronage to maintain stability.",
          syllabusArea: "Wars of the Roses - Yorkist Rule",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ]
    },
    "Richard III, Henry Tudor, and the End of the Wars": {
      Easy: [
        {
          id: "end_easy_001",
          topic: "Richard III, Henry Tudor, and the End of the Wars",
          difficulty: "Easy",
          questionText: "Which battle in 1485 effectively ended the Wars of the Roses?",
          options: [
            { id: "A", text: "Bosworth" },
            { id: "B", text: "Tewkesbury" },
            { id: "C", text: "Towton" },
            { id: "D", text: "Barnet" }
          ],
          correctOptionId: "A",
          explanation: "The Battle of Bosworth Field saw Henry Tudor defeat Richard III, ending the conflict and beginning the Tudor dynasty.",
          syllabusArea: "Wars of the Roses - End of the Wars",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Medium: [
        {
          id: "end_med_001",
          topic: "Richard III, Henry Tudor, and the End of the Wars",
          difficulty: "Medium",
          questionText: "How did Henry Tudor consolidate his claim to the throne after 1485?",
          options: [
            { id: "A", text: "By marrying Elizabeth of York" },
            { id: "B", text: "By dissolving Parliament" },
            { id: "C", text: "By exiling all Yorkists" },
            { id: "D", text: "By ceding territory to France" }
          ],
          correctOptionId: "A",
          explanation: "Henry married Elizabeth of York to unite the warring houses and strengthen his legitimacy.",
          syllabusArea: "Wars of the Roses - End of the Wars",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ],
      Hard: [
        {
          id: "end_hard_001",
          topic: "Richard III, Henry Tudor, and the End of the Wars",
          difficulty: "Hard",
          questionText: "Which factor best explains Henry VII's consolidation of power: marriage alliance, elimination of rivals, or reform of finances?",
          options: [
            { id: "A", text: "Marriage alliance" },
            { id: "B", text: "Elimination of rivals" },
            { id: "C", text: "Financial reform" },
            { id: "D", text: "A combination of all three" }
          ],
          correctOptionId: "D",
          explanation: "Henry VII's security relied on uniting the houses, neutralising threats and strengthening the crown's fiscal position.",
          syllabusArea: "Wars of the Roses - End of the Wars",
          sourceNote: "General A-level Wars of the Roses content"
        }
      ]
    }
  };

  // ----- Application State -----

  const appState = {
    currentScreen: 'loading',
    userMode: null, // 'localProfile' or 'guest'
    userProfile: null,
    quizSetup: {
      selectedTopic: null,
      selectedDifficulty: null,
      selectedQuestionCount: null
    },
    activeQuiz: null,
    analytics: null,
    chart: null,
    timerInterval: null
  };

  // Helper: generate a simple unique ID using timestamp and random number
  function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }

  // ----- Storage Functions -----

  function loadFromStorage() {
    try {
      const profileStr = localStorage.getItem('peakmind_profile');
      appState.userProfile = profileStr ? JSON.parse(profileStr) : null;
    } catch (err) {
      console.error('Failed to parse profile from localStorage', err);
      appState.userProfile = null;
    }
    try {
      const analyticsStr = localStorage.getItem('peakmind_analytics');
      appState.analytics = analyticsStr
        ? JSON.parse(analyticsStr)
        : {
            quizzesStarted: 0,
            quizzesCompleted: 0,
            guestQuizzesCompleted: 0,
            localProfileQuizzesCompleted: 0,
            fakeDoorClicks: 0,
            fakeDoorResponses: { yes: 0, maybe: 0, no: 0 }
          };
    } catch (err) {
      console.error('Failed to parse analytics from localStorage', err);
      appState.analytics = {
        quizzesStarted: 0,
        quizzesCompleted: 0,
        guestQuizzesCompleted: 0,
        localProfileQuizzesCompleted: 0,
        fakeDoorClicks: 0,
        fakeDoorResponses: { yes: 0, maybe: 0, no: 0 }
      };
    }
  }
  // ---------------------------------------------------------------------------
  // Ensure the sample question bank has a minimum of five questions per topic
  // and difficulty by duplicating existing entries. This duplication is used
  // solely for demonstration and should be replaced with unique questions in a
  // production-ready version.
  ;(function ensureMinimumQuestions() {
    const topics = Object.keys(questionBank);
    topics.forEach((topic) => {
      ['Easy', 'Medium', 'Hard'].forEach((difficulty) => {
        const arr = questionBank[topic][difficulty];
        if (!Array.isArray(arr) || arr.length === 0) return;
        while (arr.length < 5) {
          const base = arr[0];
          const clone = { ...base, id: `${base.id}_dup${arr.length}` };
          arr.push(clone);
        }
      });
    });
  })();

  function saveProfile() {
    try {
      localStorage.setItem('peakmind_profile', JSON.stringify(appState.userProfile));
    } catch (err) {
      console.error('Failed to save profile to localStorage', err);
    }
  }

  function saveAnalytics() {
    try {
      localStorage.setItem('peakmind_analytics', JSON.stringify(appState.analytics));
    } catch (err) {
      console.error('Failed to save analytics to localStorage', err);
    }
  }

  function resetActiveQuiz() {
    appState.activeQuiz = null;
    if (appState.timerInterval) {
      clearInterval(appState.timerInterval);
      appState.timerInterval = null;
    }
  }

  // ----- UI Rendering -----

  // Main entry point: decide which screen to render
  function render() {
    const container = document.getElementById('app');
    container.innerHTML = '';

    switch (appState.currentScreen) {
      case 'welcome':
        container.appendChild(renderWelcomeScreen());
        break;
      case 'createProfile':
        container.appendChild(renderCreateProfileScreen());
        break;
      case 'dashboard':
        container.appendChild(renderDashboard());
        break;
      case 'quizSetup':
        container.appendChild(renderQuizSetupScreen());
        break;
      case 'activeQuiz':
        container.appendChild(renderActiveQuizScreen());
        break;
      case 'review':
        container.appendChild(renderReviewScreen());
        break;
      default:
        container.appendChild(renderLoadingScreen());
        break;
    }
  }

  // Loading screen (short)
  function renderLoadingScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';
    wrapper.innerHTML = '<h2>Loading...</h2>';
    return wrapper;
  }

  // Welcome/menu screen
  function renderWelcomeScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';
    const title = document.createElement('h1');
    title.textContent = 'Peak Mind Quiz';
    const desc = document.createElement('p');
    desc.textContent = 'Revise the Wars of the Roses with active recall quizzes.';

    const createBtn = document.createElement('button');
    createBtn.textContent = 'Create Local Profile';
    createBtn.addEventListener('click', () => {
      appState.currentScreen = 'createProfile';
      render();
    });

    const guestBtn = document.createElement('button');
    guestBtn.textContent = 'Continue as Guest';
    guestBtn.addEventListener('click', () => {
      appState.userMode = 'guest';
      appState.userProfile = null;
      appState.currentScreen = 'dashboard';
      render();
    });

    wrapper.appendChild(title);
    wrapper.appendChild(desc);
    wrapper.appendChild(createBtn);
    wrapper.appendChild(guestBtn);
    return wrapper;
  }

  // Create profile screen
  function renderCreateProfileScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';
    const title = document.createElement('h2');
    title.textContent = 'Create Local Profile';
    const instruction = document.createElement('p');
    instruction.textContent = 'Enter a display name (2–20 characters). Your progress will be saved on this browser.';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Display name';

    const errorMsg = document.createElement('p');
    errorMsg.style.color = 'var(--color-wrong)';

    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continue';
    continueBtn.addEventListener('click', () => {
      const name = input.value.trim();
      if (name.length < 2 || name.length > 20) {
        errorMsg.textContent = 'Name must be between 2 and 20 characters.';
        return;
      }
      // Create new profile object
      appState.userProfile = {
        id: generateId('user'),
        displayName: name,
        createdAt: new Date().toISOString(),
        lastQuizCompletedDate: null,
        totalQuizzesCompleted: 0,
        currentStreak: 0,
        bestStreak: 0,
        totalCorrectAnswers: 0,
        totalWrongAnswers: 0,
        totalQuestionsAnswered: 0,
        averageScorePercent: 0,
        bestScorePercent: 0,
        quizAttempts: [],
        preferences: { soundEnabled: true }
      };
      appState.userMode = 'localProfile';
      saveProfile();
      appState.currentScreen = 'dashboard';
      render();
    });

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Menu';
    backBtn.className = 'secondary';
    backBtn.addEventListener('click', () => {
      appState.currentScreen = 'welcome';
      render();
    });

    wrapper.appendChild(title);
    wrapper.appendChild(instruction);
    wrapper.appendChild(input);
    wrapper.appendChild(errorMsg);
    wrapper.appendChild(continueBtn);
    wrapper.appendChild(backBtn);
    return wrapper;
  }

  // Dashboard screen
  function renderDashboard() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';

    const heading = document.createElement('h2');
    heading.textContent = appState.userMode === 'localProfile'
      ? `Welcome, ${appState.userProfile.displayName}`
      : 'Welcome, Guest';
    wrapper.appendChild(heading);

    const startQuizBtn = document.createElement('button');
    startQuizBtn.textContent = 'Start Quiz';
    startQuizBtn.addEventListener('click', () => {
      appState.currentScreen = 'quizSetup';
      render();
    });
    wrapper.appendChild(startQuizBtn);

    // If guest, show message and create profile button
    if (appState.userMode === 'guest') {
      const msg = document.createElement('p');
      msg.textContent = 'You are using Guest Mode. Completed quizzes will not be saved.';
      wrapper.appendChild(msg);

      const createBtn = document.createElement('button');
      createBtn.textContent = 'Create Profile to Save Progress';
      createBtn.addEventListener('click', () => {
        appState.currentScreen = 'createProfile';
        render();
      });
      wrapper.appendChild(createBtn);

      return wrapper;
    }

    // For local profile, show statistics
    const stats = document.createElement('div');
    stats.innerHTML = `
      <p><strong>Total quizzes completed:</strong> ${appState.userProfile.totalQuizzesCompleted}</p>
      <p><strong>Average score:</strong> ${appState.userProfile.averageScorePercent.toFixed(1)}%</p>
      <p><strong>Best score:</strong> ${appState.userProfile.bestScorePercent.toFixed(1)}%</p>
      <p><strong>Current streak:</strong> ${appState.userProfile.currentStreak} days</p>
      <p><strong>Best streak:</strong> ${appState.userProfile.bestStreak} days</p>
    `;
    wrapper.appendChild(stats);

    // Recent quiz attempts list
    const attempts = appState.userProfile.quizAttempts;
    const recentHeading = document.createElement('h3');
    recentHeading.textContent = 'Recent Quizzes';
    wrapper.appendChild(recentHeading);

    if (!attempts || attempts.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'Complete a quiz to see your recent attempts.';
      wrapper.appendChild(emptyMsg);
    } else {
      const list = document.createElement('ul');
      list.className = 'recent-list';
      const recent = attempts.slice(-5).reverse();
      recent.forEach((attempt) => {
        const li = document.createElement('li');
        const left = document.createElement('span');
        left.textContent = `${attempt.date} - ${attempt.topic} (${attempt.difficulty})`;
        const right = document.createElement('span');
        right.textContent = `${attempt.scorePercent}%`;
        li.appendChild(left);
        li.appendChild(right);
        list.appendChild(li);
      });
      wrapper.appendChild(list);
    }

    // Improvement chart container
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container';
    const canvas = document.createElement('canvas');
    canvas.id = 'progressChart';
    chartContainer.appendChild(canvas);
    wrapper.appendChild(chartContainer);

    // Fake-door monetisation button (after at least one quiz)
    if (appState.userProfile.totalQuizzesCompleted > 0) {
      const fakeBtn = document.createElement('button');
      fakeBtn.textContent = 'Unlock More Wars of the Roses Revision Quizzes';
      fakeBtn.className = 'secondary';
      fakeBtn.addEventListener('click', () => {
        appState.analytics.fakeDoorClicks += 1;
        saveAnalytics();
        const response = prompt('More revision content is coming soon. Would you consider paying £2.99 for a full Wars of the Roses revision quiz pack? (yes/maybe/no)');
        if (response) {
          const ans = response.toLowerCase();
          if (['yes', 'maybe', 'no'].includes(ans)) {
            appState.analytics.fakeDoorResponses[ans] += 1;
            saveAnalytics();
          }
        }
      });
      wrapper.appendChild(fakeBtn);
    }

    // Render the chart after the DOM is ready
    requestAnimationFrame(() => {
      renderChart();
    });

    return wrapper;
  }

  // Quiz setup screen
  function renderQuizSetupScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';
    const title = document.createElement('h2');
    title.textContent = 'Quiz Setup';

    // Topic selector
    const topicLabel = document.createElement('label');
    topicLabel.textContent = 'Select Topic';
    const topicSelect = document.createElement('select');
    topicSelect.innerHTML = '<option value="">--Select--</option>';
    Object.keys(questionBank).forEach((topic) => {
      const opt = document.createElement('option');
      opt.value = topic;
      opt.textContent = topic;
      topicSelect.appendChild(opt);
    });
    topicSelect.value = appState.quizSetup.selectedTopic || '';

    // Difficulty selector
    const diffLabel = document.createElement('label');
    diffLabel.textContent = 'Select Difficulty';
    const diffSelect = document.createElement('select');
    diffSelect.innerHTML = '<option value="">--Select--</option>';
    ['Easy', 'Medium', 'Hard'].forEach((diff) => {
      const opt = document.createElement('option');
      opt.value = diff;
      opt.textContent = diff;
      diffSelect.appendChild(opt);
    });
    diffSelect.value = appState.quizSetup.selectedDifficulty || '';

    // Question count selector
    const countLabel = document.createElement('label');
    countLabel.textContent = 'Number of Questions';
    const countSelect = document.createElement('select');
    countSelect.innerHTML = '<option value="">--Select--</option>';
    [5, 10, 15, 20].forEach((num) => {
      const opt = document.createElement('option');
      opt.value = num;
      opt.textContent = num;
      countSelect.appendChild(opt);
    });
    countSelect.value = appState.quizSetup.selectedQuestionCount || '';

    const errorMsg = document.createElement('p');
    errorMsg.style.color = 'var(--color-wrong)';

    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start Quiz';
    startBtn.addEventListener('click', () => {
      // Validate selections
      const topic = topicSelect.value;
      const diff = diffSelect.value;
      const count = parseInt(countSelect.value, 10);
      if (!topic) {
        errorMsg.textContent = 'Please select a topic.';
        return;
      }
      if (!diff) {
        errorMsg.textContent = 'Please select a difficulty.';
        return;
      }
      if (!count) {
        errorMsg.textContent = 'Please select number of questions.';
        return;
      }
      const available = questionBank[topic][diff];
      if (available.length < count) {
        errorMsg.textContent = `Not enough questions available for ${topic} (${diff}). Available: ${available.length}.`;
        return;
      }
      // Save selections
      appState.quizSetup.selectedTopic = topic;
      appState.quizSetup.selectedDifficulty = diff;
      appState.quizSetup.selectedQuestionCount = count;
      startQuiz();
    });

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Dashboard';
    backBtn.className = 'secondary';
    backBtn.addEventListener('click', () => {
      appState.currentScreen = 'dashboard';
      render();
    });

    wrapper.appendChild(title);

    wrapper.appendChild(topicLabel);
    wrapper.appendChild(topicSelect);
    wrapper.appendChild(diffLabel);
    wrapper.appendChild(diffSelect);
    wrapper.appendChild(countLabel);
    wrapper.appendChild(countSelect);
    wrapper.appendChild(errorMsg);
    wrapper.appendChild(startBtn);
    wrapper.appendChild(backBtn);
    return wrapper;
  }

  // Start quiz: sets up activeQuiz and moves to activeQuiz screen
  function startQuiz() {
    const topic = appState.quizSetup.selectedTopic;
    const diff = appState.quizSetup.selectedDifficulty;
    const count = appState.quizSetup.selectedQuestionCount;
    const allQuestions = [...questionBank[topic][diff]];
    // Shuffle questions
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    appState.activeQuiz = {
      id: generateId('quiz'),
      mode: appState.userMode,
      status: 'in_progress',
      topic,
      difficulty: diff,
      questionCount: count,
      startedAt: new Date().toISOString(),
      finishedAt: null,
      timerSeconds: 0,
      currentQuestionIndex: 0,
      selectedQuestions: selected.map((q) => q.id),
      answers: []
    };
    appState.analytics.quizzesStarted += 1;
    saveAnalytics();
    appState.currentScreen = 'activeQuiz';
    render();
    // Start timer
    if (appState.timerInterval) clearInterval(appState.timerInterval);
    appState.timerInterval = setInterval(() => {
      if (appState.activeQuiz) {
        appState.activeQuiz.timerSeconds += 1;
        const timerEl = document.getElementById('quiz-timer');
        if (timerEl) timerEl.textContent = formatTime(appState.activeQuiz.timerSeconds);
      }
    }, 1000);
  }

  // Format time from seconds to mm:ss
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  // Active quiz screen
  function renderActiveQuizScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';

    const quiz = appState.activeQuiz;
    const topic = quiz.topic;
    const difficulty = quiz.difficulty;
    const questionIndex = quiz.currentQuestionIndex;
    const question = getQuestionById(quiz.selectedQuestions[questionIndex]);

    const header = document.createElement('div');
    header.innerHTML = `<p><strong>Topic:</strong> ${topic} | <strong>Difficulty:</strong> ${difficulty} | <strong>Question ${questionIndex + 1}/${quiz.questionCount}</strong></p>`;
    wrapper.appendChild(header);

    // Timer
    const timerEl = document.createElement('div');
    timerEl.id = 'quiz-timer';
    timerEl.className = 'timer';
    timerEl.textContent = formatTime(quiz.timerSeconds);
    wrapper.appendChild(timerEl);

    // Question text
    const qText = document.createElement('p');
    qText.textContent = question.questionText;
    wrapper.appendChild(qText);

    // Answer options
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    question.options.forEach((opt) => {
      const optDiv = document.createElement('div');
      optDiv.className = 'quiz-option';
      optDiv.dataset.optionId = opt.id;
      optDiv.textContent = `${opt.id}. ${opt.text}`;
      optDiv.addEventListener('click', () => {
        if (wrapper.dataset.locked === 'true') return;
        // Unselect previous
        const allOptionDivs = optionsDiv.querySelectorAll('.quiz-option');
        allOptionDivs.forEach((div) => div.classList.remove('selected'));
        optDiv.classList.add('selected');
      });
      optionsDiv.appendChild(optDiv);
    });
    wrapper.appendChild(optionsDiv);

    // Feedback placeholder
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    wrapper.appendChild(feedback);

    // Buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.marginTop = '10px';

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm Answer';
    confirmBtn.addEventListener('click', () => {
      if (wrapper.dataset.locked === 'true') return;
      // Determine selected option
      const selectedDiv = optionsDiv.querySelector('.quiz-option.selected');
      if (!selectedDiv) {
        feedback.textContent = 'Please select an option first.';
        feedback.className = 'feedback wrong';
        return;
      }
      wrapper.dataset.locked = 'true';
      const selectedId = selectedDiv.dataset.optionId;
      const wasCorrect = selectedId === question.correctOptionId;
      // Mark options accordingly
      optionsDiv.querySelectorAll('.quiz-option').forEach((div) => {
        const optId = div.dataset.optionId;
        if (optId === question.correctOptionId) {
          div.classList.add('correct');
        }
        if (optId === selectedId && !wasCorrect) {
          div.classList.add('wrong');
        }
      });
      // Set feedback
      if (wasCorrect) {
        feedback.textContent = 'Correct';
        feedback.className = 'feedback correct';
      } else {
        feedback.textContent = `Incorrect. The correct answer is ${question.correctOptionId}.`;
        feedback.className = 'feedback wrong';
      }
      // Record answer
      quiz.answers.push({
        questionId: question.id,
        selectedOptionId: selectedId,
        correctOptionId: question.correctOptionId,
        wasCorrect,
        timeSpentSeconds: null // optional: can measure per-question time if needed
      });
      // If last question, change confirm button text to finish
      if (questionIndex === quiz.questionCount - 1) {
        nextBtn.textContent = 'Finish Quiz';
      }
      // Disable confirm button
      confirmBtn.classList.add('disabled');
    });

    // Next/Finish button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = questionIndex === quiz.questionCount - 1 ? 'Finish Quiz' : 'Next Question';
    nextBtn.addEventListener('click', () => {
      // Only proceed if answer has been confirmed
      if (wrapper.dataset.locked !== 'true') {
        feedback.textContent = 'Please confirm your answer before proceeding.';
        feedback.className = 'feedback wrong';
        return;
      }
      if (questionIndex === quiz.questionCount - 1) {
        finishQuiz();
      } else {
        quiz.currentQuestionIndex += 1;
        appState.currentScreen = 'activeQuiz';
        render();
      }
    });

    buttonsDiv.appendChild(confirmBtn);
    buttonsDiv.appendChild(nextBtn);
    wrapper.appendChild(buttonsDiv);
    return wrapper;
  }

  // Helper to get question object by ID
  function getQuestionById(id) {
    for (const topic of Object.keys(questionBank)) {
      for (const difficulty of Object.keys(questionBank[topic])) {
        const q = questionBank[topic][difficulty].find((ques) => ques.id === id);
        if (q) return q;
      }
    }
    return null;
  }

  // Finish quiz
  function finishQuiz() {
    if (!appState.activeQuiz) return;
    const quiz = appState.activeQuiz;
    quiz.status = 'finished';
    quiz.finishedAt = new Date().toISOString();
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
    appState.analytics.quizzesCompleted += 1;

    const correctCount = quiz.answers.filter((a) => a.wasCorrect).length;
    const wrongCount = quiz.questionCount - correctCount;
    const scorePercent = Math.round((correctCount / quiz.questionCount) * 100);

    // Save attempt if local profile user
    if (appState.userMode === 'localProfile' && appState.userProfile) {
      // Update streak
      updateStreakOnCompletion();
      // Build attempt object
      const attempt = {
        id: generateId('attempt'),
        date: new Date().toLocaleDateString(),
        startedAt: quiz.startedAt,
        finishedAt: quiz.finishedAt,
        topic: quiz.topic,
        difficulty: quiz.difficulty,
        totalQuestions: quiz.questionCount,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        scorePercent,
        durationSeconds: quiz.timerSeconds,
        answers: quiz.answers
      };
      appState.userProfile.totalQuizzesCompleted += 1;
      appState.userProfile.totalCorrectAnswers += correctCount;
      appState.userProfile.totalWrongAnswers += wrongCount;
      appState.userProfile.totalQuestionsAnswered += quiz.questionCount;
      // Update average and best scores
      const totalQuizzes = appState.userProfile.totalQuizzesCompleted;
      appState.userProfile.averageScorePercent = ((appState.userProfile.averageScorePercent * (totalQuizzes - 1)) + scorePercent) / totalQuizzes;
      if (scorePercent > appState.userProfile.bestScorePercent) {
        appState.userProfile.bestScorePercent = scorePercent;
      }
      // Save attempt
      appState.userProfile.quizAttempts.push(attempt);
      saveProfile();
      appState.analytics.localProfileQuizzesCompleted += 1;
    } else {
      appState.analytics.guestQuizzesCompleted += 1;
    }
    saveAnalytics();
    resetActiveQuiz();
    // Store results for review screen
    appState.reviewData = {
      topic: quiz.topic,
      difficulty: quiz.difficulty,
      questionCount: quiz.questionCount,
      correctCount,
      wrongCount,
      scorePercent,
      durationSeconds: quiz.timerSeconds,
      answers: quiz.answers.map((ans) => {
        const q = getQuestionById(ans.questionId);
        return {
          questionText: q.questionText,
          selectedOptionId: ans.selectedOptionId,
          correctOptionId: ans.correctOptionId,
          wasCorrect: ans.wasCorrect,
          options: q.options,
          explanation: q.explanation
        };
      })
    };
    appState.currentScreen = 'review';
    render();
  }

  // Update streak logic on completion for local profiles
  function updateStreakOnCompletion() {
    const profile = appState.userProfile;
    const todayStr = new Date().toLocaleDateString();
    // Check lastQuizCompletedDate
    if (!profile.lastQuizCompletedDate) {
      profile.currentStreak = 1;
    } else {
      const lastDate = new Date(profile.lastQuizCompletedDate);
      const today = new Date();
      // Determine difference in days
      const diffTime = today.setHours(0,0,0,0) - lastDate.setHours(0,0,0,0);
      const diffDays = diffTime / (1000 * 3600 * 24);
      if (diffDays === 0) {
        // already completed a quiz today; streak unchanged
      } else if (diffDays === 1) {
        profile.currentStreak += 1;
      } else {
        profile.currentStreak = 1;
      }
    }
    // Update best streak
    if (profile.currentStreak > profile.bestStreak) {
      profile.bestStreak = profile.currentStreak;
    }
    profile.lastQuizCompletedDate = todayStr;
  }

  // Review screen
  function renderReviewScreen() {
    const wrapper = document.createElement('div');
    wrapper.className = 'screen-card';
    const data = appState.reviewData;
    const title = document.createElement('h2');
    title.textContent = 'Quiz Review';
    wrapper.appendChild(title);

    const summary = document.createElement('p');
    summary.innerHTML = `Topic: <strong>${data.topic}</strong> | Difficulty: <strong>${data.difficulty}</strong><br>
      Score: <strong>${data.correctCount}/${data.questionCount}</strong> (${data.scorePercent}%) | Duration: <strong>${formatTime(data.durationSeconds)}</strong>`;
    wrapper.appendChild(summary);

    // List of questions with feedback
    data.answers.forEach((ans, index) => {
      const qDiv = document.createElement('div');
      qDiv.style.marginTop = '15px';
      const qNum = document.createElement('p');
      qNum.innerHTML = `<strong>Q${index + 1}.</strong> ${ans.questionText}`;
      qDiv.appendChild(qNum);
      // Show options with selected/correct highlight
      ans.options.forEach((opt) => {
        const optP = document.createElement('p');
        let classes = '';
        if (opt.id === ans.correctOptionId) {
          classes += ' correct';
        }
        if (opt.id === ans.selectedOptionId && !ans.wasCorrect) {
          classes += ' wrong';
        }
        optP.className = classes.trim();
        optP.style.paddingLeft = '10px';
        optP.textContent = `${opt.id}. ${opt.text}`;
        qDiv.appendChild(optP);
      });
      // Show explanation for wrong answers
      if (!ans.wasCorrect) {
        const expl = document.createElement('p');
        expl.style.color = 'var(--color-text-muted)';
        expl.style.fontStyle = 'italic';
        expl.textContent = `Explanation: ${ans.explanation}`;
        qDiv.appendChild(expl);
      }
      wrapper.appendChild(qDiv);
    });

    // Action buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.marginTop = '20px';
    const returnBtn = document.createElement('button');
    returnBtn.textContent = 'Return to Dashboard';
    returnBtn.addEventListener('click', () => {
      appState.currentScreen = 'dashboard';
      render();
    });
    const newQuizBtn = document.createElement('button');
    newQuizBtn.textContent = 'Start New Quiz';
    newQuizBtn.addEventListener('click', () => {
      appState.quizSetup = { selectedTopic: null, selectedDifficulty: null, selectedQuestionCount: null };
      appState.currentScreen = 'quizSetup';
      render();
    });
    const sameSettingsBtn = document.createElement('button');
    sameSettingsBtn.textContent = 'Try Same Settings Again';
    sameSettingsBtn.addEventListener('click', () => {
      // Use the previous settings
      appState.quizSetup.selectedTopic = data.topic;
      appState.quizSetup.selectedDifficulty = data.difficulty;
      appState.quizSetup.selectedQuestionCount = data.questionCount;
      startQuiz();
    });
    buttonsDiv.appendChild(returnBtn);
    buttonsDiv.appendChild(newQuizBtn);
    buttonsDiv.appendChild(sameSettingsBtn);
    wrapper.appendChild(buttonsDiv);
    return wrapper;
  }

  // Render or update improvement chart
  function renderChart() {
    if (appState.userMode !== 'localProfile') return;
    const attempts = appState.userProfile.quizAttempts;
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    if (!attempts || attempts.length === 0) {
      ctx.style.display = 'none';
      return;
    }
    ctx.style.display = 'block';
    const labels = attempts.map((a) => a.date);
    const data = attempts.map((a) => a.scorePercent);

    if (appState.chart) {
      appState.chart.data.labels = labels;
      appState.chart.data.datasets[0].data = data;
      appState.chart.update();
    } else {
      appState.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Score (%)',
              data,
              borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(),
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              tension: 0.3
            }
          ]
        },
        options: {
          scales: {
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: 'Score (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Quiz Date'
              }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  // Initialise the app on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    if (appState.userProfile) {
      appState.userMode = 'localProfile';
      appState.currentScreen = 'dashboard';
    } else {
      appState.userMode = null;
      appState.currentScreen = 'welcome';
    }
    render();
  });
})();
