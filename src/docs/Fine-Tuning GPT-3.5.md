# Fine-Tuning GPT-3.5

### Fine-tuned GPT-3.5 does a remarkable job of generating responses in the same tone & personality as the training dataset.

1. Follow the instructions in the [gen_openai_finetuning_dataset.py](https://github.com/smokie777/luna-2.0/blob/30fac96b08978be34af05589f6bb2e0a5f6e28f9/python/scripts/gen_openai_finetuning_dataset.py) file to generate a dataset in the correct format for fine-tuning.

   1. Use Google Sheets to prepare anywhere from 1-1000 rows of data
   2. Export the sheet in `.tsv` format
   3. Run `gen_dataset()` to generate a `.jsonl` file from the `.tsv` file

2. Follow the instructions in the [run_openai_finetuning_job.py](https://github.com/smokie777/luna-2.0/blob/30fac96b08978be34af05589f6bb2e0a5f6e28f9/python/scripts/run_openai_finetuning_job.py) file to run the fine-tuning job using the OpenAI API. The job usually finishes within 24 hours.

3. Once the fine-tuning job has finished, retrieve the fine-tuned model's ID, and save it into `.env`. The model can then be used for inference.
