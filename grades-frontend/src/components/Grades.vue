<template>
  <div class="grades-container">
    <h1 class="grades-title">My Grades</h1>

    <form @submit.prevent="addGrade" class="grades-form">
      <input v-model="newGrade.title" placeholder="title" required class="grades-input" />
      <textarea v-model="newGrade.content" placeholder="content" class="grades-textarea"></textarea>
      <label class="grades-checkbox-label">
        <input type="checkbox" v-model="newGrade.important" />Important
      </label>
      <button type="submit" class="grades-submit">Add</button>
    </form>

    <hr class="grades-separator" />

    <div v-for="grade in grades" :key="grade.id" class="grade-card" :class="{ important: grade.important }">
      <h3 class="grade-title">
        {{ grade.title }}
        <span v-if="grade.important" class="grade-important">IMPORTANT</span>
      </h3>
      <p class="grade-content">{{ grade.content }}</p>
      <button @click="openModal(grade)" class="grade-edit">Edit</button>
      <button @click="removeGrade(grade.id)" class="grade-delete">Delete</button>
    </div>

    <ModalEdit :gradeOriginal="selectedGrade" :show="showModal" @close="showModal = false" @updating="loadGrades" />
  </div>
</template>

<script setup>
import { grades, newGrade, selectedGrade, showModal, addGrade, removeGrade, openModal, loadGrades } from '../js/Grades.js';
import ModalEdit from './ModalEdit.vue';
</script>

<style src="../css/grades.css"></style>
