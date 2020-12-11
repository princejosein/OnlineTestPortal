<template>
    <em v-if="loading">
        <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
                {{ loadingText }}
            </v-col>
            <v-col cols="8">
                <v-progress-linear
                    color="deep-purple accent-4"
                    indeterminate
                    rounded
                    height="6"
                ></v-progress-linear>
            </v-col>
        </v-row>
    </em>
</template>

<script>
export default {
    name: "LinearProgressBar",
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: "Loading..."
        }
    }
};
</script>

<style></style>
