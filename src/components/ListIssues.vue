<template>
    <div id="ListItems">
        <div v-for="issue in listIssues" :key="issue.issueId">
            <h3>{{ issue.title }}</h3>
            <p> {{ issue.text}} </p>
            <p> Author {{ issue.firstNameAuthor + ' ' + issue.lastNameAuthor}} </p>
            <div><router-link :to="'/issue/' + issue.issueId + '/'">All issue</router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListIssues',
    props: ['listIssues']
}
</script>