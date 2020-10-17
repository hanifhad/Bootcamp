# Import the files
import os
import csv

# Set path for file for the Election Information, note that the PyBank.Py file is located with the data (meaning the same folder). If taken outside the folder, it will give an error.
csvpath=os.path.join("budget_data.csv")

print(csvpath)

# Open the CSV and segmenting the information
with open (csvpath) as csvfile:
    budget_data = csv.reader(csvfile, delimiter=",")
    next (budget_data, None)

    # Design a list Totals
    Totals = []

    # Design a list for all Dates
    Dates = []

    # Set dates
    previous_month = 0
    current_month = 0
    changes_month = []

    for row in budget_data:
        # Add totals
        Totals.append(int(row[1]))
        # Add dates
        Dates.append(row[0])

        # Calculation for the months 
        current_month = int(row[1])
        months_changes = current_month - previous_month
        changes_month.append(months_changes)
        previous_month = current_month

# Calculate profit based on the data
Totals = sum(Totals)

# The number of months in the data
Total_months = len(Dates)

# Delete value of zero in the changes/month so that you are able to calculate the average monthly change
del changes_month [0]

# Calculate average change to 2 decimal places
average_monthly_change=round((sum(changes_month)/len(changes_month)), 2)

# Delete value in index 0 position in the dates list so that you can calculate increases/decreases
del Dates[0]

month_changes_table=zip(Dates, changes_month)

largest_increase=0
largest_increase_mth=''
largest_decrease=0
largest_decrease_mth=''

for row in month_changes_table:
    if largest_increase<row[1]:
        largest_increase=row[1]
        largest_increase_mth=row[0]
    
    if largest_decrease>row[1]:
        largest_decrease=row[1]
        largest_decrease_mth=row[0]

#output Financial Analysis to txt file
# This is shows the data in a certain format, the more important line is 78
output='''Report
Total Number of Months in the data set: {0}, Total Profit: ${1}, Average Change: (${2}), Greatest Increase in Profits: {3} (${4}), Greatest Decrease in Profits: {5} (${6})

'''.format(Total_months, Totals, average_monthly_change, largest_increase_mth, largest_increase, largest_decrease_mth, largest_decrease)
# Line 78 is the key input, through linking the variables to the numbers in a sequential fashion

# Line 83 to 86 will output a file that contains the above information in the same folder.

output_file = os.path.join("PyBank Summary.txt")

with open (output_file, 'w') as txtfile:
    txtfile.write(output)

#print to terminal
print(output)
    
    