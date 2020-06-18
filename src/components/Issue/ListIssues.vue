<template>
    <div id="ListItems">
        <div class="card" v-for="issue in listIssues" :key="issue.issueId">
            <div class="card-body">
                <div class="row">
                    <h4 class="card-title col-6">{{ issue.title }}</h4>
                    <p class="card-subtitle mb-1 text-muted text-center col-3"> Author {{ issue.firstNameAuthor + ' ' + issue.lastNameAuthor}} </p>
                    <p class="card-subtitle mb-1 text-muted text-right col-3"><Timeago :datetime="issue.createAt.date"></Timeago> </p>
                </div>
                <p class="card-text"> {{ issue.text}} </p>
                <div><router-link class="cardd-link" :to="'/issue/' + issue.issueId + '/'">See all comments</router-link></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ListIssues',
    props: ['listIssues']
}
</script>