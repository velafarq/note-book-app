const MOCK_RECENT_POSTS = {
    "recentPosts": [
        {
            "id": "11111",
            "userId": "abcdef",
            "userName": "djevtovic",
            "category": "Performance",
            "date": "4th July 2090",
            "title": "Last night at Carnegie Hall",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        },
        {
            "id": "22222",
            "userId": "abcdef",
            "userName": "djevtovic",
            "category": "Practice Session",
            "date": "5th July 2090",
            "title": "Finally got the 3rd movement!",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        },
        {
            "id": "33333",
            "userId": "abcdef",
            "userName": "djevtovic",
            "category": "Lesson",
            "date": "6th July 2090",
            "title": "My teacher nearly killed me",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        },
        {
            "id": "44444",
            "userId": "abcdef",
            "userName": "djevtovic",
            "category": "Master Class",
            "date": "7th July 2090",
            "title": "Truls Mork at CU Boulder",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

        },
    ]
};

function getRecentPosts(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_RECENT_POSTS)}, 100);
}


function displayRecentPosts(data) {
    for (index in data.recentPosts) {
       $('.left-block').append(
        ` <section class="left-block__post-summary">
        <h3 class="left-block__post-summary__summary-heading">${data.recentPosts[index].title}</h3>
        <p class="left-block__post-summary__info"><span>In: ${data.recentPosts[index].category}</span><span>${data.recentPosts[index].date}</span></p>
        <p class="left-block__post-summary-snippet">${data.recentPosts[index].content}</p>
        <a class="left-block__post-summary__view-more">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`);
    }
}
function getAndDisplayRecentPosts() {
    getRecentPosts(displayRecentPosts);
}

$(function() {
    getAndDisplayRecentPosts();
})

function displayPerformances(MOCK_RECENT_POSTS) {
    $( ".left-block").empty();
    const performanceData = MOCK_RECENT_POSTS.recentPosts.filter(post => post.category === "Performance");
    for (index in performanceData) {
        $('.left-block').append(` <section class="left-block__post-summary">
        <h3 class="left-block__post-summary__summary-heading">${performanceData[index].title}</h3>
        <p class="left-block__post-summary__info"><span>In: ${performanceData[index].category}</span><span>${performanceData[index].date}</span></p>
        <p class="left-block__post-summary-snippet">${performanceData[index].content}</p>
        <a class="left-block__post-summary__view-more">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`)
    }
}
function getAndDisplayPerformances() {
    getRecentPosts(displayPerformances);
}

function displayPracticeSessions(MOCK_RECENT_POSTS) {
    $( ".left-block").empty();
    const practiceData = MOCK_RECENT_POSTS.recentPosts.filter(post => post.category === "Practice Session");
    for (index in practiceData) {
        $('.left-block').append(` <section class="left-block__post-summary">
        <h3 class="left-block__post-summary__summary-heading">${practiceData[index].title}</h3>
        <p class="left-block__post-summary__info"><span>In: ${practiceData[index].category}</span><span>${practiceData[index].date}</span></p>
        <p class="left-block__post-summary-snippet">${practiceData[index].content}</p>
        <a class="left-block__post-summary__view-more">VIEW MORE <i class="fas fa-caret-right"></i></a>
    </section>`)
    }
}
function getAndDisplayPracticeSessions() {
    getRecentPosts(displayPracticeSessions);
}



