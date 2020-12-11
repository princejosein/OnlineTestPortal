<template>

<v-container
id="quiz-list"
fluid
tag="section">

    <v-row>
        <!-- Total quiz count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="info"
          icon="mdi-shape-outline"
          title="Total"
          :value="total"
        />
        </v-col>

        <!-- Total active quiz count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="success"
          icon="mdi-lightbulb-on"
          title="Active"
          :value="active"
        />
        </v-col>

       <!-- Total category count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="secondary"
          icon="mdi-lightbulb-on"
          title="Category"
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

        <!-- List table of quizes -->
        <v-col
        cols="12"
        >
        <base-material-card
            icon="mdi-clipboard-text"
            title="Quiz List"
            class="px-5 py-3"
            >

        <!-- Datatable -->
        <v-data-table
        :headers="headers"
        :items="quizLists"
        class="elevation-1"
        >

            <template v-slot:top>
            <v-toolbar
                flat
            >
            <v-spacer></v-spacer>

            <!-- Dialog for add and edit category -->
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
            New Quiz
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

                    <!-- Quiz Name -->
                    <validation-provider name="Quiz Name" rules="required|max:64" v-slot="{ errors }">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Quiz Name"
                      data-vv-as="Quiz Name"
                    ></v-text-field>
                    <span class="red--text">{{ errors[0] }}</span>
                    </validation-provider>


                    <v-select
                    v-model="editedItem.question_level"
                    :items="quizLevel"
                    label="Quiz Level"
                    ></v-select>

                    <v-select
                    v-model="editedItem.category_id"
                    :items="categoriesList"
                    item-text="name"
                    item-value="id"
                    label="Category"
                    ></v-select>

                    <v-select
                    v-model="editedItem.status"
                    :items="statuses"
                    label="Status"
                    ></v-select>

                    <!-- Error section -->
                    <v-col v-if="errored">
                        <section>
                        <span class="red--text">Sorry, we are too busy. Please try again after some time</span>
                    </section>
                    </v-col>

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

         <v-icon
            class="mr-2"
            @click="view(item)"
        >
        mdi-book-open
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
    name:"QuizList",
    data() {
        return {
            quizLevel:['Beginner','Intermediate','Expert'],
            errored: false,
            valid: true,
            statuses:[
                'Active',
                'Not Active'
            ],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            editedItem: {
                id:0,
                name: '',
                question_level:'',
                category_id:'',
                status: '',
            },
            defaultItem: {
                id:0,
                name: '',
                question_level:'',
                category_id:'',
                status: '',
            },
            total:"0",
            active:"0",
            headers:[
                {
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Question level', value: 'question_level' },
                { text: 'Category', value: 'category_name' },
                { text: 'Status', value: 'status' },
                { text: 'Created', value: 'created_at' },
                { text: 'Updated', value: 'updated_at' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            categoriesList:[],
            quizLists:[]
        }
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Quiz' : 'Edit Quiz'
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
        this.getCategories()
        this.getQuizLists();
    },
    methods: {
            async getQuizLists() {
            try {
                const response = await axios.get('/api/quiz');
                this.quizLists = response.data.data;
                this.total =  response.data.total.toString();
                this.active = response.data.active.toString();
            } catch (error) {
                this.errored = true;
                console.log(error)
            }
        },
        async getCategories() {
            try {
                const response = await axios.get('/api/category');
                this.categoriesList = response.data.data;
                this.total =  response.data.total.toString();
                this.active = response.data.active.toString();
            } catch (error) {
                this.errored = true;
                console.log(error)
            }
        },
        editItem (item) {
            this.editedIndex = this.quizLists.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        view(item) {
            this.$router.push(`/admin/pages/quiz/questions/${item.id}`)
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
                    const response = await axios.post("/api/quiz", this.editedItem);
                } else {
                    const response = await axios.put(`/api/quiz/${this.editedItem.id}`, this.editedItem);
                }
                this.close()
                this.getQuizLists();
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
