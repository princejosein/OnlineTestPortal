<template>
<v-container
id="category-list"
fluid
tag="section">
    <v-row>

<!-- Total category count widget -->
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

<!-- Total active category count widget -->
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

       <!-- Total questions count widget -->
        <v-col
        cols="12"
        sm="6"
        lg="3"
        >
        <base-material-stats-card
          color="secondary"
          icon="mdi-lightbulb-on"
          title="Questions"
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

<!-- List table of categories -->
<v-col
        cols="12"
        >
<base-material-card
      icon="mdi-clipboard-text"
      title="Category List"
      class="px-5 py-3"
    >



    <v-data-table
    :headers="headers"
    :items="categoryList"
    class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
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
              New Category
            </v-btn>
          </template>
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
                   <validation-provider name="Category Name" rules="required|max:64" v-slot="{ errors }">
        <v-text-field
                      v-model="editedItem.name"
                      label="Category Name"
                      data-vv-as="Category Name"
                    ></v-text-field>
        <span class="red--text">{{ errors[0] }}</span>
      </validation-provider>

 <validation-provider name="Category Description" rules="required" v-slot="{ errors }">
      <v-textarea
      v-model="editedItem.description"
      label="Category Description"
      auto-grow
    ></v-textarea>
    <span class="red--text">{{ errors[0] }}</span>
      </validation-provider>

                  </v-col>
                  <v-col
                    cols="12"
                  >
                  <v-select
          v-model="editedItem.status"
          :items="statuses"
          label="Status"
        ></v-select>
                  </v-col>

                  <v-col v-if="errored">
                      <section>
                <span class="red--text">Sorry, we are too busy. Please try again after some time</span>
            </section>
                  </v-col>

                </v-row>
              </v-container>
            </v-card-text>


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


    <template v-slot:item.actions="{ item }">
      <v-icon
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>

    </template>

    </v-data-table>



    </base-material-card>
</v-col>

    </v-row>
</v-container>
</template>

<script>


export default {
    name:"CategoryList",
    data() {
        return {
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
        description:'',
        status: 'Active',
      },
      defaultItem: {
        id:0,
        name: '',
        description:'',
        calories: 'Active',
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
          { text: 'Status', value: 'status' },
          { text: 'Created', value: 'created_at' },
          { text: 'Updated', value: 'updated_at' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        categoryList:[]
        }
    },
     computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        async getCategories() {
            try {
                const response = await axios.get('/api/category');
                this.categoryList = response.data.data;
                this.total =  response.data.total.toString();
                this.active = response.data.active.toString();
            } catch (error) {
                this.errored = true;
                console.log(error)
            }
        },
        editItem (item) {
        this.editedIndex = this.categoryList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
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
                console.log(this.editItem)
                const response = await axios.post("/api/category", this.editedItem);
            } else {
                const response = await axios.put(`/api/category/${this.editedItem.id}`, this.editedItem);
            }
            this.close()
            this.getCategories();
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
