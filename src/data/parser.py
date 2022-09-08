import ast
import json
f = open('./learner.json')
learners = ast.literal_eval(json.loads(f.read()))
with open('parsed_learner.json', 'w') as jsonfile:
    json.dump(learners, jsonfile)
