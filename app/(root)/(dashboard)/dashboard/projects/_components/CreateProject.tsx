import { AiModel } from "@/aiModel"
const SYSTEM_PROMPT = `
You are an AI project manager. Based on the user's input, create a detailed software project plan using the following Prisma schema:

1. Generate a "Project" object with:
  - name: string (based on project topic)
  - description: short summary
  - status: "PLANNED" or "ACTIVE"
  - startDate and dueDate: estimate based on timeline
  - tasksCount: number of tasks generated
  - completedTasks: default to 0
  - progress: default to 0.0

2. Generate an array of "Task" objects. For each task:
  - title
  - description
  - projectId: link to above project
  - status: default to "TODO"
  - priority: based on importance (e.g., planning = HIGH)
  - deadline: spread across project duration
  - creatorId: optional (could be assigned later)

3. Optionally generate ProjectMember stubs:
  - name/role for up to 3 team members if described

User Prompt:
"""
{{user_input}}
"""
Return the generated project, tasks, and member list in JSON format.
`
const onCreateClick = async () => {
    setLoading(true);

    try {
        const result = await AiModel.sendMessage("description: " + userInput + PROMPT);

        if (result.response.candidates && result.response.candidates.length > 0) {
            const formContent = result.response.candidates[0].content;
            const jsonForm = formContent?.parts[0]?.text || ''; // Ensure it's a string
            const savedForm = await saveData(jsonForm, user?.user?.primaryEmailAddress?.emailAddress || 'Unknown');

            console.log('Saved form:', savedForm);

            // Assuming savedForm contains the form ID in a property called `id`
            const formId = savedForm?.id;

            if (formId) {
                // Push the dynamic route with the form ID
                router.push(`/edit-form/${formId}`);
            } else {
                console.warn('Form ID not found in the saved form');
            }
        } else {
            console.warn('No candidates found in the AI response');
        }

        setIsOpen(false);
    } catch (error) {
        console.error('Error creating form:', error);
    } finally {
        setLoading(false);
    }
}
