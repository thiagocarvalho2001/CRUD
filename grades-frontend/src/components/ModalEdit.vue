<template>
    <transition name="fade">
        <div v-if="show" class="modal-overlay" @click.self="close">
            <transition name="slide">
                <div class="modal-container">
                    <h1 class="modal-title">Edit Grade</h1>
                    <form @submit.prevent="updateGrade" class="modal-form">
                        <input v-model="grade.title" placeholder="Title" required class="modal-input" />
                        <textarea v-model="grade.content" placeholder="Content" class="modal-textarea"></textarea>
                        <label class="modal-checkbox-label">
                            <input type="checkbox" v-model="grade.important" />
                            <span>Important</span>
                        </label>
                        <div class="modal-buttons">
                            <button type="submit" class="btn btn-save">Save</button>
                            <button type="button" @click="close" class="btn btn-cancel">Cancel</button>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import api from '../services/api';

const props = defineProps({
    gradeOriginal: Object,
    show: Boolean
});

const emit = defineEmits(['close', 'updating']);
const grade = ref({ ...props.gradeOriginal });

watch(() => props.gradeOriginal, (newGrade) => {
    grade.value = { ...newGrade };
});

const updateGrade = async () => {
    await api.put(`/grades/${grade.value.id}`, grade.value);
    emit('updating');
    close();
};

const close = () => {
    emit('close');
};
</script>

<style src="../css/modal.css"></style>