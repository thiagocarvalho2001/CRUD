<template>
    <div class="overlay" @click.self="close">
        <div class="modal">
            <h1>Edit Grade</h1>
            <form @submit.prevent="updateGrade">
                <input v-model="grade.title" placeholder="Title" required />
                <textarea v-model="grade.content" placeholder="Content"></textarea>
                <label>
                    <input type="checkbox" v-model="grade.important" />
                    Important
                </label>
                <div class="buttons">
                    <button type="submit">Save</button>
                    <button type="button" @click="close">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import api from '../services/api'

const props = defineProps({
    gradeOriginal: Object,
    show: Boolean
})

const emit = defineEmits(['close', 'updating'])
const grade = ref({...props.gradeOriginal})

watch(() => props.gradeOriginal, (nova) => {
    grade.value = {...nova}
})

const updateGrade = async () => {
    await api.put(`/grades/${grade.value.id}`, grade.value)
    emit('updating')
    close()
}

const close = () => {
    emit('close')
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 400px;
    max-width: 90%;
}

.modal h1 {
    margin: 0 0 20px;
    font-size: 24px;
}

.modal input,
.modal textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.modal label {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.modal button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.modal button[type="submit"] {
    background-color: #4CAF50;
    color: white;
}

.modal button[type="button"] {
    background-color: #f44336;
    color: white;
}

.modal button:hover {
    opacity: 0.9;
}
</style>