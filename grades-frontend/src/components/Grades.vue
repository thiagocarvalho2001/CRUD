<template>
  <div class="container">
    <h1>My Grades</h1>

    <form @submit.prevent="saveGrade">
      <input v-model="formGrade.title" placeholder="title" required />
      <textarea v-model="formGrade.content" placeholder="content"></textarea>
      <label>
        <input type="checkbox" v-model="formGrade.important" />
        Important
      </label>
      <button type="submit">{{  editing ? 'Update' : 'Add' }}</button>
      <button v-if="editing" type="button" @click="cancelEdit">Cancel</button>
    </form>

    <hr />

    <div v-for="grade in grades" :key="grade.id" class="grade">
      <h3>{{ grade.title }} <span v-if="grade.important">IMPORTANT</span></h3>
      <p>{{  grade.content }}</p>
      <button @click="editGrade(grade)">Edit</button>
      <button @click="removeGrade(grade.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted } from 'vue';
import api from '../services/api';

const grades =ref([])
const formGrade = ref({
  title: '',
  content: '',
  important: false
});
const editing = ref(false)
const gradeIdEditing = ref(null)

const loadGrades = async () => {
  const res = await api.get('/grades')
  grades.value = res.data
}

const saveGrade = async () => {
  if(!formGrade.value.title) return

  if(editing.value){
    await api.put(`/grades/${gradeIdEditing.value}`, formGrade.value)
  }else{
    await api.post('/grades', formGrade.value)
  }

  formGrade.value = {title: '', content: '', important: false}
  editing.value = false
  gradeIdEditing.value = null
  loadGrades()
}

const removeGrade = async (id) => {
  await api.delete(`/grades/${id}`)
  loadGrades()
}

const editGrade = (grade) => {
  formGrade.value = { ...grade }
  editing.value = true
  gradeIdEditing.value = grade.id
}

const cancelEdit = () => {
  editing.value = false
  gradeIdEditing.value = null
  formGrade.value = { title: '', content: '', important: false}
}

onMounted(() => {
  loadGrades()
})
</script>

<!-- Temporary CSS-->

<style scoped>
.container{
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.grade{
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>