const modelsData = {
    categories: [
        { id: "llm", name: "Large Language Models", icon: "fas fa-brain", description: "Models for text generation, reasoning, and conversation." },
        { id: "image", name: "Image Generation", icon: "fas fa-image", description: "Create stunning visuals from text prompts." },
        { id: "audio", name: "Audio & Speech", icon: "fas fa-microphone", description: "Speech-to-text, text-to-speech, and music generation." },
        { id: "multimodal", name: "Multimodal", icon: "fas fa-layer-group", description: "Models that understand both text and images." },
        { id: "code", name: "Code Generation", icon: "fas fa-code", description: "Specialized models for programming and software development." }
    ],
    models: [
        {
            id: 1,
            name: "Llama 4",
            developer: "Meta",
            category: "llm",
            description: "The latest generation of Meta's open-weight language models, designed for scalability and efficiency.",
            trending: true,
            recent: true,
            tags: ["New", "SOTA"],
            link: "https://huggingface.co/meta-llama"
        },
        {
            id: 2,
            name: "Gemma 3",
            developer: "Google",
            category: "llm",
            description: "A family of lightweight, state-of-the-art open models built from the same technology used to create Gemini.",
            trending: true,
            recent: true,
            tags: ["Lightweight"],
            link: "https://huggingface.co/google/gemma-3-27b"
        },
        {
            id: 3,
            name: "DeepSeek-V3",
            developer: "DeepSeek",
            category: "llm",
            description: "Strong performance in reasoning and coding, often rivaling proprietary models.",
            trending: true,
            recent: false,
            tags: ["Reasoning"],
            link: "https://huggingface.co/deepseek-ai/DeepSeek-V3"
        },
        {
            id: 4,
            name: "Stable Diffusion 3.5",
            developer: "Stability AI",
            category: "image",
            description: "The most advanced text-to-image model from Stability AI with improved prompt adherence.",
            trending: true,
            recent: true,
            tags: ["Art"],
            link: "https://huggingface.co/stabilityai/stable-diffusion-3.5-large"
        },
        {
            id: 5,
            name: "Whisper v3",
            developer: "OpenAI",
            category: "audio",
            description: "A general-purpose speech recognition model for transcription and translation.",
            trending: false,
            recent: false,
            tags: ["Speech"],
            link: "https://huggingface.co/openai/whisper-large-v3"
        },
        {
            id: 6,
            name: "Qwen 2.5 Coder",
            developer: "Alibaba Cloud",
            category: "code",
            description: "Specialized model for coding tasks with state-of-the-art performance in multiple languages.",
            trending: true,
            recent: true,
            tags: ["Coding"],
            link: "https://huggingface.co/Qwen/Qwen2.5-Coder-32B-Instruct"
        },
        {
            id: 7,
            name: "Janus-Pro-7B",
            developer: "DeepSeek",
            category: "multimodal",
            description: "A unified multimodal understanding and generation model.",
            trending: true,
            recent: true,
            tags: ["Vision"],
            link: "https://huggingface.co/deepseek-ai/Janus-Pro-7B"
        },
        {
            id: 8,
            name: "Mistral 7B v0.3",
            developer: "Mistral AI",
            category: "llm",
            description: "Highly efficient and powerful small language model.",
            trending: false,
            recent: false,
            tags: ["Efficient"],
            link: "https://huggingface.co/mistralai/Mistral-7B-v0.3"
        },
        {
            id: 9,
            name: "Flux.1",
            developer: "Black Forest Labs",
            category: "image",
            description: "A new standard for high-quality image generation from the creators of Stable Diffusion.",
            trending: true,
            recent: true,
            tags: ["Photorealism"],
            link: "https://huggingface.co/black-forest-labs/FLUX.1-dev"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = modelsData;
}
