
import joblib
import pandas as pd
import numpy as np

def predict_risk(patient_data):
    """
    Predicts the risk of opioid overdose using a trained machine learning model.

    Args:
        patient_data (dict): A dictionary containing patient data.

    Returns:
        dict: A dictionary containing the prediction and risk probability.
    """
    # Load the trained model and preprocessing objects
    try:
        model = joblib.load('best_model.pkl')
        scaler = joblib.load('scaler.pkl')
        label_encoders = joblib.load('label_encoders.pkl')
    except FileNotFoundError:
        return {"error": "Model files not found. Please ensure best_model.pkl, scaler.pkl, and label_encoders.pkl are in the root directory."}

    # Create a pandas DataFrame from the input data
    df = pd.DataFrame([patient_data])

    # Preprocess the data
    # Label encode categorical features
    for col, le in label_encoders.items():
        # Handle unseen values by adding them to the encoder's classes
        for label in df[col].unique():
            if label not in le.classes_:
                le.classes_ = np.append(le.classes_, label)
        df[col + '_encoded'] = le.transform(df[col])

    # Drop original categorical columns
    df = df.drop(columns=list(label_encoders.keys()))

    # The model was trained on these features in this order.
    # We need to make sure the dataframe has the same columns in the same order.
    # The list of features is from the notebook.
    feature_names = [
        'age',
        'weight_kg',
        'height_cm',
        'has_chronic_pain',
        'has_mental_health_dx',
        'history_of_substance_abuse',
        'liver_disease',
        'kidney_disease',
        'respiratory_disease',
        'daily_dosage_mg',
        'treatment_duration_months',
        'concurrent_benzos',
        'concurrent_muscle_relaxants',
        'concurrent_sleep_meds',
        'concurrent_antidepressants',
        'tobacco_use',
        'previous_overdose',
        'daily_mme',
        'risk_factors_count',
        'gender_encoded',
        'primary_opioid_encoded',
        'alcohol_use_encoded'
    ]

    # Align the dataframe columns with the feature names the model was trained on
    df = df.reindex(columns=feature_names, fill_value=0)


    # Scale numerical features
    scaled_features = scaler.transform(df)

    # Make prediction
    prediction = model.predict(scaled_features)
    probability = model.predict_proba(scaled_features)

    return {
        "prediction": prediction.tolist(),
        "risk_probability": probability.tolist()
    }
