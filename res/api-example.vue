<template>
    <div>
        <input v-model="_id"><button @click="loadData">Load Data</button>
        <div v-if="loaded">
            <h1>Final</h1>
            <br />
            <pre>
                {{ finalData }} 
            </pre>
        </div>
    </div>
</template>

<script setup>

let finalData = ref({})
let _id = ref()
let loaded = ref(false)

const loadData = async () => {
    finalData.value = {}
    const { data } = await useAsyncData('nodeDetails', () =>
        $fetch(`/api/getNode?_id=${_id.value}`)
    )
    const { data: data2 } = await useAsyncData('recordDetails', () =>
        $fetch(`/api/getRecord?_id=${_id.value}`)
    )

    loaded.value = true

    finalData.value = { ...data.value.node, ...data2.value?.data }
}


</script>