<template>
    <div id="ListItems">
        <div class="card" v-for="issue in listIssues" :key="issue.issueId">
            <div class="card-body">
                <h4 class="card-title">{{ issue.title }}</h4>
                <h6 class="card-subtitle mb-1 text-muted"> Author {{ issue.firstNameAuthor + ' ' + issue.lastNameAuthor}} </h6>
                <p class="card-text"> {{ issue.text}} </p>
                <div><router-link class="cardd-link" :to="'/issue/' + issue.issueId + '/'">See all issue</router-link></div>
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