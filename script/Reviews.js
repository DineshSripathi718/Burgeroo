const url = "https://dummyjson.com/comments";

const reviewContainer = document.querySelector('.review-container');

async function fetchReviews(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.comments);
        displayLimitedReviews(data.comments);
    }catch(error){
        reviewInternetIssueMessage();
    }
}

function reviewInternetIssueMessage(){
    reviewContainer.innerText = "please connect to a active internet"
    reviewContainer.classList.add("internetIssue");
}


fetchReviews();


const reviewDisplaySize = 3;
function displayLimitedReviews(data){

    const DisplayData = data;
    console.log(DisplayData);
    console.log(DisplayData);
    DisplayData.forEach(
        (item) => {
            const container = document.createElement('div');
            const review = document.createElement('p');
            const username = document.createElement('p');
            const rating = document.createElement('p');

            review.innerText = item.body;
            username.innerText = `- ${item.user.username}`;
            rating.innerText = `Rating: ${item.likes}/ 5`;

            /* class names */
            review.classList.add('review-text');
            username.classList.add('review-username');
            rating.classList.add('review-rating');
            
            container.append(rating);
            container.append(review);
            container.append(username);
            container.classList.add('review-item');
            reviewContainer.append(container);
        }
    );
    
}