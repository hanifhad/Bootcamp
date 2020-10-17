import csv
import os
import operator
csvpath=os.path.join("election_data.csv")

with open (csvpath, 'r', newline='') as csvfile:
    election_data=csv.reader(csvfile, delimiter=",")
    next(election_data, None)
    
    #candidate appears in list as many times they have a vote
    candidates_votes=[]    
    for row in election_data:
        candidates_votes.append(row[2])

# Identify all candidates
candidates = list(set(candidates_votes))

# Count total votes
Totalvotecount=len(candidates_votes)

# Identify the number of votes for each candidate
correy_total_votes=candidates_votes.count(candidates[0])
otooley_total_votes=candidates_votes.count(candidates[1])
li_total_votes=candidates_votes.count(candidates[2])
khan_total_votes=candidates_votes.count(candidates[3])

# Design list for above candidates
number_votes = [correy_total_votes, otooley_total_votes, li_total_votes, khan_total_votes]
candidatesvotes = dict(zip(candidates,number_votes))

# Calculate the percentage of votes for the candidates
correy_percent=round((candidates_votes.count(candidates[0])/Totalvotecount*100), 1)
otooley_percent=round((candidates_votes.count(candidates[1])/Totalvotecount*100),1)
li_percent=round((candidates_votes.count(candidates[2])/Totalvotecount*100), 1)
khan_percent=round((candidates_votes.count(candidates[3])/Totalvotecount*100),1)

# Design a dictionary for the above percentages
vote_percentages=[correy_percent, otooley_percent, li_percent, khan_percent]

candidate_percentages = dict(zip(candidates,vote_percentages))

winner=max(candidatesvotes.items(), key=operator.itemgetter(1))[0]


# The Election Results
output='''Election Results

Total Votes: {0}, Khan: {1}% ({2}), Correy: {3}% ({4}), Li: {5}% ({6}), O'Tooley: {7}% ({8})

Therefore, the winner is {9}

'''.format(Totalvotecount, candidate_percentages["Khan"], candidatesvotes["Khan"], candidate_percentages["Correy"], candidatesvotes["Correy"], candidate_percentages["Li"], candidatesvotes["Li"], candidate_percentages["O'Tooley"], candidatesvotes["O'Tooley"], winner)

output_file=os.path.join("PyPoll Summary.txt")

with open (output_file, "w") as txtfile:
    txtfile.write(output)

#print to terminal
print(output)
