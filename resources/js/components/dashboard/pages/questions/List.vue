<template>

<v-container
id="question-list"
fluid
tag="section">

    <v-row>
        <!-- Total question count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="info"
          icon="mdi-shape-outline"
          title="Total"
          value="2"
        />
        </v-col>

        <!-- Total active question count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="success"
          icon="mdi-lightbulb-on"
          title="Active"
          value="3"
        />
        </v-col>

       <!-- Total quiz count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="secondary"
          icon="mdi-lightbulb-on"
          title="Quiz"
          value="230"
        />
        </v-col>

        <!-- Total exams count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="warning"
          icon="mdi-lightbulb-on"
          title="Exams"
          value="23"
        />
        </v-col>

        <!-- List table of questions -->
        <v-col
        cols="12"
        >
        <base-material-card
            icon="mdi-clipboard-text"
            title="Question List"
            class="px-5 py-3"
            >

        <!-- Datatable -->
        <v-data-table
        :headers="headers"
        :items="questionList"
        class="elevation-1"
        >

            <template v-slot:top>
            <v-toolbar
                flat
            >
            <v-spacer></v-spacer>

            <!-- Dialog for add and edit question -->
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
            New Question
            </v-btn>
            </template>

            <!-- Dialog form -->
            <v-card>
                <validation-observer v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">

                <v-card-title>
                <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                    >

                    <!-- Question -->
                    <validation-provider name="Question" rules="required" v-slot="{ errors }">
                    <v-text-field
                      v-model="editedItem.question"
                      label="Question"
                      data-vv-as="Question"
                    ></v-text-field>
                    <span class="red--text">{{ errors[0] }}</span>
                    </validation-provider>

                    <v-select
                    v-model="editedItem.quiz_id"
                    :items="quizList"
                    item-value="id"
                    item-text="name"
                    label="Quiz"
                    ></v-select>

                    <!-- Options -->
                    <v-radio-group v-model="editedItem.radioGroup">
                    <v-row
                    v-for="(item, index) in editedItem.options"
                    :key="index"
                    align="center"
                    >
                    <v-col cols="1">
                      <v-list-item-action>
                        <v-radio
                        color="secondary"
                        :key="index"
                        :value="index"
                        ></v-radio>
                      </v-list-item-action>
                    </v-col>

                    <v-col cols="11">
                        <v-text-field
                        v-model="item.option"
                        :label="`Option ${index+1}`"
                        :data-vv-as="`Option ${index+1}`"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    </v-radio-group>

                    <v-select
                    v-model="editedItem.status"
                    :items="statuses"
                    label="Status"
                    ></v-select>
                    </v-col>

                    <!-- Error section -->
                    <v-col v-if="errored">
                        <section>
                        <span class="red--text">Sorry, we are too busy. Please try again after some time</span>
                    </section>
                    </v-col>

                    </v-row>
                </v-container>
                </v-card-text>

                <!-- Button area of dialog -->
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    @click="close"
                >
                Cancel
                </v-btn>

                <v-btn
                    color="primary"
                    type="submit"
                >
                    Save
                </v-btn>
                </v-card-actions>
                </form>
               </validation-observer>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- table actions button -->
    <template v-slot:item.actions="{ item }">
        <v-icon
            class="mr-2"
            @click="editItem(item)"
        >
        mdi-pencil
        </v-icon>
    </template>

    </v-data-table>
    <!-- Datatable ends -->

    </base-material-card>
    </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    name:"QuestionList",
    data() {
        return {
            defaultItem:{
                id:0,
                question:'',
                quiz_id:'',
                radioGroup:0,
                options:[
                    {option:"", id:0},
                    {option:"", id:0},
                    {option:"", id:0}
                ],
            },
            editedItem: {
                id:0,
                question:'',
                quiz_id:'',
                radioGroup:0,
                options:[
                    {option:"", id:0},
                    {option:"", id:0},
                    {option:"", id:0}
                ],
            },
            quizList:[],
            errored: false,
            valid: true,
            statuses:[
                'Active',
                'Not Active'
            ],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            total:"0",
            active:"0",
            headers:[
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'question',
                },
                { text: 'Quiz', value: 'quiz_name' },
                { text: 'Status', value: 'status' },
                { text: 'Created', value: 'created_at' },
                { text: 'Updated', value: 'updated_at' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            questionList:[]
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Question' : 'Edit Question'
        },
    },

    // Check dialog open or close
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    // Load categories from API
    mounted() {
        this.getQuizes()
        this.getQuestions()
    },
    methods: {
        async getQuizes() {
            try {
                const response = await axios.get('/api/quiz');
                this.quizList = response.data.select_list;
                this.total =  response.data.total.toString();
            } catch (error) {
                this.errored = true;
                console.log(error)
            }
        },
        async getQuestions() {
            try {
                const response = await axios.get('/api/question');
                this.questionList = response.data.data;
                this.total =  response.data.total.toString();
            } catch (error) {
                this.errored = true;
                console.log(error)
            }
        },
        editItem (item) {
            this.editedIndex = this.questionList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
            console.log(this.editedItem)
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        async onSubmit () {
            this.errored = false;
            try {
                if(this.editedIndex === -1)
                {
                    const response = await axios.post("/api/question", this.editedItem);
                } else {
                    const response = await axios.put(`/api/question/${this.editedItem.id}`, this.editedItem);
                }
                this.close()
                this.getQuestions();
            } catch (error) {
                console.log(error);
                this.errored = true;
            }

        }
    }
}
</script>

<style>
span {
  display: block;
}
</style>
